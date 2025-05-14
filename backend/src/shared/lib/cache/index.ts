import type { PrismaClient } from "@prisma";
import type { RedisClient } from "bun";
import config from "@shared/config";
import { EXPOSURES, KEYS } from "@shared/lib/cache/constants";
import type {
  CacheEntityType,
  CacheKeyFields,
  CacheKeyParams,
} from "@shared/lib/cache/types";
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
    const eligibleKeys: CacheKeyFields = KEYS[type];
    const parts: string[] = [type];

    for (const key of eligibleKeys) {
      const value = args[key];
      if (!value) continue;

      parts.push(value, args.exposure ?? "", key);
      break;
    }

    return parts.length === 1 ? null : parts.filter(Boolean).join(":");
  }

  async flush(
    type: CacheEntityType,
    userId: string,
    opts: Omit<CacheKeyParams, "userId" | "exposure"> = {},
  ): Promise<void> {
    const keysToRemove: string[] = [];

    for (const [key, value] of Object.entries(opts)) {
      if (!value) continue;

      for (const exposure of EXPOSURES) {
        const mappedKey = Cache.mapKey(type, { [key]: value, exposure });
        if (mappedKey) keysToRemove.push(mappedKey);
      }
    }

    for (const exposure of EXPOSURES) {
      const mappedKey = Cache.mapKey(type, { userId, exposure });
      if (mappedKey) keysToRemove.push(mappedKey);
    }

    await this.remove(keysToRemove);
  }

  async set(
    key: string,
    value: unknown,
    expiration = config.CACHE_EXPIRE_TIME,
  ): Promise<void> {
    await this.redis.set(key, JSON.stringify(value), "PX", expiration);
  }

  async remove(key: string | string[]): Promise<void> {
    const keys = Array.isArray(key) ? key : [key];
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

    const keysToRemove: string[] = [];

    for (const exposure of EXPOSURES) {
      const userFiles = Cache.mapKey("file", { exposure, userId });
      const userFolders = Cache.mapKey("folder", { exposure, userId });
      if (userFolders) keysToRemove.push(userFolders);
      if (userFiles) keysToRemove.push(userFiles);

      for (const folder of folderIds) {
        const folderKey = Cache.mapKey("folder", {
          exposure,
          folderId: folder,
        });
        if (folderKey) keysToRemove.push(folderKey);
      }

      for (const file of fileIds) {
        const fileKey = Cache.mapKey("file", {
          exposure,
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
