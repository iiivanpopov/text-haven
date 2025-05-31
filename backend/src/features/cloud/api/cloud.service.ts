import {
  Exposure,
  type File,
  type Folder,
  PrismaClient,
  TextCategory,
} from "@prisma";
import { Post } from "@features/cloud/lib/types";
import FileDto from "@entities/file/model/dto";
import FolderDto from "@entities/folder/model/dto";
import { Cache } from "@shared/lib/cache";
import { CacheEntityType } from "@shared/lib/cache/types";
import ApiError from "@shared/lib/exceptions/ApiError";
import logger from "@shared/lib/logger";
import Logger from "@shared/lib/logger";
import { canAccessResource, resolveUserContext } from "@shared/lib/prisma";
import type { Storage } from "@shared/lib/storage";

export default class CloudService {
  constructor(
    private prisma: PrismaClient,
    private storage: Storage,
    private cache: Cache,
  ) {}

  async getUserContent(
    userId: string,
    folderId?: string,
  ): Promise<{
    folders: Folder[];
    files: File[];
    isRoot: boolean;
  }> {
    const key: CacheEntityType = "storage";

    if (folderId) {
      Logger.info(folderId);
      return this.cache.withCache(key, { folderId }, async () => {
        const storage = await this.prisma.folder.findUnique({
          where: { id: folderId },
          include: { children: true, files: true },
        });

        if (!storage) throw ApiError.NotFound("Storage not found");

        const { children, ...rest } = storage;
        return { ...rest, folders: children, isRoot: false };
      });
    }

    return this.cache.withCache(key, { userId }, async () => {
      const folders = await this.prisma.folder.findMany({
        where: { userId, parentId: null },
      });
      return { folders, files: [], isRoot: true };
    });
  }

  async clearExpiredFiles(): Promise<void> {
    const expired = await this.prisma.file.findMany({
      where: { expiresAt: { lt: new Date() } },
      select: { id: true, userId: true, folderId: true, textCategory: true },
    });

    if (expired.length === 0) {
      logger.info("Nothing to clear");
      return;
    }

    logger.info(`Clearing ${expired.length} expired files`);
    const fileIds = expired.map((f) => f.id);

    let clearPosts = false;

    const cacheTasks = expired.map(({ id, userId, folderId, textCategory }) => {
      if (textCategory === TextCategory.POST) clearPosts = true;
      return this.cache.flush("file", userId, { fileId: id, folderId });
    });

    if (clearPosts) cacheTasks.push(this.cache.remove(["post"]));

    await Promise.all([
      ...cacheTasks,
      this.storage.deleteFiles(fileIds),
      this.prisma.file.deleteMany({ where: { id: { in: fileIds } } }),
    ]);

    logger.info(`Successfully cleared ${expired.length} expired files`);
  }

  async deleteFolderRecursively(folderId: string): Promise<void> {
    if (!folderId) return;

    const [children, files] = await Promise.all([
      this.prisma.folder.findMany({
        where: { parentId: folderId },
        select: { id: true },
      }),
      this.prisma.file.findMany({
        where: { folderId },
        select: { id: true },
      }),
    ]);

    if (children.length > 0) {
      await Promise.all(
        children.map((child) => this.deleteFolderRecursively(child.id)),
      );
    }

    if (files.length > 0) {
      const fileIds = files.map((f) => f.id);
      await Promise.all([
        this.prisma.file.deleteMany({ where: { id: { in: fileIds } } }),
        this.storage.deleteFiles(fileIds),
      ]);
    }

    await this.prisma.folder.deleteMany({ where: { id: folderId } });
  }

  async getLatestPosts(): Promise<Post[]> {
    return this.cache.withCache("post", {}, async () => {
      const latest = await this.prisma.file.findMany({
        where: { textCategory: TextCategory.POST },
        take: 3,
        orderBy: { createdAt: "desc" },
        select: { createdAt: true, userId: true, id: true, name: true },
      });

      if (!latest.length) return [];

      const posts = await Promise.all(
        latest.map(async (post) => {
          const { content } = await this.getFileContent(post.id, post.userId);
          return { ...post, content: content.slice(0, 100) };
        }),
      );

      await this.cache.set("post", posts);
      return posts;
    });
  }

  async getFoldersOrFolder(
    userId: string,
    options: { parentId?: string; folderId?: string; targetUserId?: string },
  ): Promise<Folder | Folder[]> {
    const { folderId } = options;
    return folderId
      ? this.getSingleFolder(userId, options)
      : this.getFolderList(userId, options);
  }

  async getSingleFolder(
    userId: string,
    { folderId, targetUserId }: { folderId?: string; targetUserId?: string },
  ): Promise<Folder> {
    const [_, effUserId] = resolveUserContext(userId, targetUserId);

    return this.cache.withCache(
      "folder",
      { folderId, userId: effUserId },
      async () => {
        const folder = await this.prisma.folder.findFirst({
          where: { id: folderId },
        });
        if (!folder) throw ApiError.NotFound("Folder not found");
        if (!canAccessResource(folder, userId)) throw ApiError.Forbidden();
        return folder;
      },
    );
  }

  async getFolderList(
    userId: string,
    { targetUserId, parentId }: { targetUserId?: string; parentId?: string },
  ): Promise<Folder[]> {
    const [isOther, effUserId] = resolveUserContext(userId, targetUserId);

    const exposure = isOther ? "PUBLIC" : "PRIVATE";

    return this.cache.withCache(
      "folder",
      { userId: effUserId, parentId, protected: isOther },
      () =>
        this.prisma.folder.findMany({
          where: {
            userId: effUserId,
            parentId,
            exposure,
          },
        }),
    );
  }

  async deleteFolder(userId: string, id: string): Promise<Folder> {
    const folder = await this.prisma.folder.findFirst({ where: { id } });
    if (!folder) throw ApiError.BadRequest("Folder not found");
    if (folder.userId !== userId) throw ApiError.Forbidden();

    await this.cache.clearCacheRecursive(userId, id);
    await this.deleteFolderRecursively(id);
    return folder;
  }

  async createFolder(
    userId: string,
    parentId?: string,
    name: string = "Untitled",
    exposure: Exposure = Exposure.PRIVATE,
  ): Promise<Folder> {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw ApiError.BadRequest("User not found");

    const exists = await this.prisma.folder.findFirst({
      where: { parentId, name, userId },
    });
    if (exists) throw ApiError.BadRequest("Folder already exists");

    if (parentId) {
      const parent = await this.prisma.folder.findUnique({
        where: { id: parentId },
      });
      if (!parent) throw ApiError.BadRequest("Parent folder not found");
    }

    const folder = await this.prisma.folder.create({
      data: { name, userId, parentId, exposure },
    });

    await this.cache.flush("folder", userId);
    return folder;
  }

  async createFile(
    userId: string,
    folderId: string,
    content: string,
    name: string = "Untitled",
    exposure: Exposure,
    textCategory: TextCategory,
    expiresAt: Date = new Date(Number.MAX_SAFE_INTEGER),
  ): Promise<File> {
    const folder = await this.prisma.folder.findFirst({
      where: { id: folderId },
    });
    if (!folder) throw ApiError.BadRequest("Folder not found");

    const exists = await this.prisma.file.findFirst({
      where: { name, userId, folderId },
    });
    if (exists) throw ApiError.BadRequest("File already exists");

    const file = await this.prisma.file.create({
      data: { name, folderId, userId, expiresAt, exposure, textCategory },
    });

    await this.cache.flush("file", userId, { folderId });
    if (textCategory === TextCategory.POST) await this.cache.remove(["post"]);
    await this.storage.writeFile(file.id, content);
    return file;
  }

  async deleteFile(userId: string, id: string): Promise<File> {
    const file = await this.prisma.file.findFirst({ where: { id } });
    if (!file) throw ApiError.BadRequest("File not found");
    if (file.userId !== userId) throw ApiError.Forbidden();

    await this.cache.flush("file", userId, {
      fileId: id,
      folderId: file.folderId,
    });

    if (file.textCategory === TextCategory.POST)
      await this.cache.remove(["post"]);
    await this.storage.deleteFile(id);
    return this.prisma.file.delete({ where: { id } });
  }

  async getFilesOrFile(
    userId: string,
    options: { folderId?: string; targetUserId?: string; fileId?: string },
  ): Promise<File | File[]> {
    const { fileId } = options;

    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw ApiError.NotFound("User not found");

    return fileId
      ? this.getSingleFile(userId, { fileId })
      : this.getFileList(userId, options);
  }

  async getSingleFile(
    userId: string,
    { fileId }: { fileId: string },
  ): Promise<File> {
    return this.cache.withCache("file", { fileId }, async () => {
      const file = await this.prisma.file.findUnique({ where: { id: fileId } });
      if (!file) throw ApiError.BadRequest("File not found");
      if (!canAccessResource(file, userId)) throw ApiError.Forbidden();
      return file;
    });
  }

  async getFileList(
    userId: string,
    { folderId, targetUserId }: { folderId?: string; targetUserId?: string },
  ): Promise<File[]> {
    const [isOther, effUserId] = resolveUserContext(userId, targetUserId);

    const exposure = isOther ? "PUBLIC" : "PRIVATE";

    return this.cache.withCache(
      "file",
      { userId: effUserId, folderId, protected: isOther },
      async () =>
        this.prisma.file.findMany({
          where: { userId: effUserId, folderId, exposure },
        }),
    );
  }

  async getFileContent(
    id: string,
    userId: string,
  ): Promise<{ content: string }> {
    const file = await this.prisma.file.findUnique({
      where: { id },
      select: { userId: true, exposure: true },
    });
    if (!file) throw ApiError.NotFound(`File with id ${id} not found`);
    if (!canAccessResource(file, userId)) throw ApiError.Forbidden();

    const content = await this.storage.getFileContent(id);
    return { content };
  }

  async updateFolder(
    userId: string,
    id: string,
    payload: any,
  ): Promise<Folder> {
    const updateData = new FolderDto(payload);

    const oldFolder = await this.prisma.folder.findUnique({
      where: { id },
      select: { userId: true, parentId: true },
    });
    if (!oldFolder) throw ApiError.BadRequest("Folder not found");
    if (oldFolder.userId !== userId) throw ApiError.Forbidden();

    await this.cache.flush("folder", userId, {
      folderId: id,
      parentId: oldFolder.parentId ?? undefined,
    });

    return this.prisma.folder.update({ where: { id }, data: updateData });
  }

  async updateFile(userId: string, id: string, payload: any): Promise<File> {
    const updateData = new FileDto(payload);

    const oldFile = await this.prisma.file.findUnique({
      where: { id },
      select: { textCategory: true, userId: true, folderId: true },
    });
    if (!oldFile) throw ApiError.BadRequest("File not found");
    if (oldFile.userId !== userId) throw ApiError.Forbidden();

    await this.cache.flush("file", userId, {
      folderId: oldFile.folderId,
      fileId: id,
    });

    if (oldFile.textCategory === TextCategory.POST)
      await this.cache.remove(["post"]);

    return this.prisma.file.update({ where: { id }, data: updateData });
  }

  async updateFileContent(
    userId: string,
    id: string,
    content: string,
  ): Promise<File> {
    const file = await this.prisma.file.findFirst({ where: { id } });
    if (!file) throw ApiError.BadRequest("File not found");
    if (file.userId !== userId) throw ApiError.Forbidden();

    await this.storage.writeFile(id, content);
    return file;
  }
}
