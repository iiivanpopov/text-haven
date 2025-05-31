import type { PrismaClient } from "@prisma";
import type { RedisClient } from "bun";
import config from "@shared/config";
import { KEYS, STATUSES } from "@shared/lib/cache/constants";
import type { CacheEntityType, CacheKeyParams } from "@shared/lib/cache/types";
import prisma from "@shared/lib/prisma";
import redis from "@shared/lib/redis";

export class Cache {
  constructor(
    private redis: RedisClient,
    private prisma: PrismaClient,
  ) {}

  static mapKey(
    type: CacheEntityType,
    args: CacheKeyParams = {},
  ): string | null {
    const eligibleKeys = KEYS[type];
    const parts: string[] = [type];

    for (const key of eligibleKeys) {
      const value = args[key];
      if (!value) continue;

      parts.push(String(value));
      if (args.protected) parts.push("PROTECTED");
      break; // only the first matching key is used
    }

    return parts.length > 1 ? parts.join(":") : null;
  }

  async flush(
    type: Exclude<CacheEntityType, "post">,
    userId: string,
    opts: Partial<Omit<CacheKeyParams, "userId" | "exposure" | "foreign">> = {},
  ): Promise<void> {
    const keysToRemove = new Set<string>();

    if (type === "user") {
      for (const val of [true, false]) {
        const key = Cache.mapKey("user", { userId, protected: val });
        if (key) keysToRemove.add(key);
      }
    } else {
      for (const status of STATUSES) {
        const keyWithUser = Cache.mapKey(type, { userId, protected: !!status });
        if (keyWithUser) keysToRemove.add(keyWithUser);

        for (const [key, value] of Object.entries(opts)) {
          if (value == null) continue;
          const paramKey = Cache.mapKey(type, {
            [key]: value,
            protected: !!status,
          });
          if (paramKey) keysToRemove.add(paramKey);
        }
      }
    }

    await this.remove([...keysToRemove]);
  }

  async set(
    key: string,
    value: unknown,
    expiration = config.CACHE_EXPIRE_TIME,
  ): Promise<void> {
    const ttl = Number.isFinite(expiration) ? expiration : 86_400_000;
    await this.redis.set(key, JSON.stringify(value), "PX", ttl);
  }

  async remove(keys: string[]): Promise<void> {
    await Promise.all(keys.map((k) => this.redis.del(k)));
  }

  async get<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    try {
      return data ? (JSON.parse(data) as T) : null;
    } catch {
      return null;
    }
  }

  async clearCacheRecursive(userId: string, folderId: string): Promise<void> {
    const folderIds = await this.getAllDescendantFolderIds(folderId);
    folderIds.push(folderId);

    const fileIds: string[] = [];

    const files = await this.prisma.file.findMany({
      where: {
        folderId: { in: folderIds },
      },
      select: { id: true },
    });

    for (const file of files) {
      fileIds.push(file.id);
    }

    const keysToRemove: (CacheEntityType | string)[] = ["post", "storage"];

    for (const status of STATUSES) {
      const userFiles = Cache.mapKey("file", { protected: !!status, userId });
      const userFolders = Cache.mapKey("folder", {
        protected: !!status,
        userId,
      });
      if (userFolders) keysToRemove.push(userFolders);
      if (userFiles) keysToRemove.push(userFiles);

      for (const folder of folderIds) {
        const folderKey = Cache.mapKey("folder", {
          protected: !!status,
          folderId: folder,
        });
        if (folderKey) keysToRemove.push(folderKey);
      }

      for (const file of fileIds) {
        const fileKey = Cache.mapKey("file", {
          protected: !!status,
          fileId: file,
        });
        if (fileKey) keysToRemove.push(fileKey);
      }
    }

    await this.remove(keysToRemove);
  }

  private async getAllDescendantFolderIds(folderId: string): Promise<string[]> {
    const descendants: string[] = [];
    const stack: string[] = [folderId];

    while (stack.length) {
      const currentId = stack.pop();
      if (!currentId) continue;

      const children = await this.prisma.folder.findMany({
        where: { parentId: currentId },
        select: { id: true },
      });

      for (const child of children) {
        descendants.push(child.id);
        stack.push(child.id);
      }
    }

    return descendants;
  }

  async withCache<T>(
    type: CacheEntityType,
    keyOpts: CacheKeyParams,
    loader: () => Promise<T>,
  ): Promise<T> {
    const cacheKey = Cache.mapKey(type, keyOpts);
    if (cacheKey) {
      const cached = await this.get<T>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const result = await loader();
    if (cacheKey) {
      await this.set(cacheKey, result);
    }
    return result;
  }
}

export default new Cache(redis, prisma);
