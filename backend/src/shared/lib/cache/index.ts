import type { PrismaClient } from "@prisma";
import type { RedisClient } from "bun";
import config from "@shared/config";
import { KEYS, STATUSES } from "@shared/lib/cache/constants";
import { CacheEntity, type CacheKeyMap } from "@shared/lib/cache/types";
import prisma from "@shared/lib/prisma";
import redis from "@shared/lib/redis";

export class Cache {
  constructor(
    private redis: RedisClient,
    private prisma: PrismaClient,
  ) {}

  mapKey<T extends keyof CacheKeyMap>(
    type: T,
    args: Partial<CacheKeyMap[T]> = {},
  ): string | null {
    const eligibleKeys = KEYS[type];
    const parts: string[] = [type];

    for (const key of eligibleKeys) {
      const value = args[key];
      if (!value) continue;

      parts.push(String(value));
      if ("protected" in args && args.protected) {
        parts.push("PROTECTED");
      }
      break;
    }

    return parts.length > 1 ? parts.join(":") : null;
  }

  async flush(
    type: CacheEntity,
    userId: string,
    opts: Partial<Record<string, string>> = {},
  ): Promise<void> {
    const keysToRemove = new Set<string>();

    if (type === CacheEntity.USER) {
      for (const val of [true, false]) {
        const key = this.mapKey(CacheEntity.USER, { userId, protected: val });
        if (key) keysToRemove.add(key);
      }
    } else if (type === CacheEntity.POST) {
      keysToRemove.add("POST");
    } else {
      for (const status of STATUSES) {
        const userKey = this.mapKey(type, { userId, protected: !!status });
        if (userKey) keysToRemove.add(userKey);

        for (const [key, value] of Object.entries(opts)) {
          if (!value) continue;

          const paramKey = this.mapKey(type, {
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

    const fileIds = await this.prisma.file
      .findMany({
        where: { folderId: { in: folderIds } },
        select: { id: true },
      })
      .then((res) => res.map((f) => f.id));

    const keysToRemove: string[] = ["POST", "STORAGE"];

    for (const status of STATUSES) {
      const userFiles = this.mapKey(CacheEntity.FILE, {
        protected: !!status,
        userId,
      });
      const userFolders = this.mapKey(CacheEntity.FOLDER, {
        protected: !!status,
        userId,
      });

      if (userFolders) keysToRemove.push(userFolders);
      if (userFiles) keysToRemove.push(userFiles);

      for (const folder of folderIds) {
        const folderKey = this.mapKey(CacheEntity.FOLDER, {
          protected: !!status,
          folderId: folder,
        });
        if (folderKey) keysToRemove.push(folderKey);
      }

      for (const file of fileIds) {
        const fileKey = this.mapKey(CacheEntity.FILE, {
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
    type: CacheEntity,
    keyOpts: Partial<CacheKeyMap[typeof type]>,
    loader: () => Promise<T>,
  ): Promise<T> {
    const cacheKey = this.mapKey(type, keyOpts);
    if (cacheKey) {
      const cached = await this.get<T>(cacheKey);
      if (cached) return cached;
    }

    const result = await loader();
    if (cacheKey) {
      await this.set(cacheKey, result);
    }
    return result;
  }
}

export default new Cache(redis, prisma);
