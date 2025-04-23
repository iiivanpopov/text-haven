import config from "@config";
import type { PrismaClient } from "@prisma";
import type { RedisClient } from "bun";
import { EXPOSURES, KEYS } from "./constants";
import type { CacheEntityType, CacheKeyFields, CacheKeyParams } from "./types";

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
      if (!args[key]) continue;

      if (typeof args[key] == "string") parts.push(args[key]);
      if (args.exposure) parts.push(args.exposure);
      if (args.includeChildren) parts.push("includeChildren");
      parts.push(key);

      break;
    }

    if (parts.length == 1) return null;
    return parts.join(":");
  }

  async flush(
    type: CacheEntityType,
    userId: string,
    opts: Omit<CacheKeyParams, "userId" | "exposure"> = {},
  ): Promise<void> {
    for (const [key, value] of Object.entries(opts)) {
      if (!value) return;

      for (const exposure of EXPOSURES) {
        const mappedKey = Cache.mapKey(type, { [key]: value, exposure });
        if (mappedKey) await this.remove(mappedKey);
      }
    }

    for (const exposure of EXPOSURES) {
      const mappedKey = Cache.mapKey(type, { userId, exposure });

      if (mappedKey) await this.remove(mappedKey);
    }
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

  async clearCacheRecursive(userId: string, folderId?: string): Promise<void> {
    const parentFolder = await this.prisma.folder.findUnique({
      where: { id: folderId },
      select: { parentId: true, id: true },
    });

    await this.flush("folder", userId, {
      folderId,
      parentId: parentFolder?.id,
    });
    await this.flush("file", userId, { folderId });

    if (parentFolder?.parentId) {
      await this.clearCacheRecursive(userId, parentFolder.parentId);
    }
  }
}

export default new Cache(config.REDIS, config.PRISMA);
