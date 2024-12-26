import config from '@config'
import type { PrismaClient } from '@prisma/client'
import { prisma } from '@utils/prisma'
import Redis from 'ioredis'

export const FOLDER_KEY = (id: string) => `folder:${id}`
export const FILE_KEY = (id: string) => `file:${id}`
export const USER_FOLDERS_KEY = (userId: string) => `user_folders:${userId}`
export const USER_FILES_KEY = (userId: string) => `user_files:${userId}`

export default class CacheService {
	private redis: Redis
	private prisma: PrismaClient

	constructor() {
		this.redis = new Redis({ host: config.REDIS_HOST, port: config.REDIS_PORT })
		this.prisma = prisma
	}

	async get<T>(key: string): Promise<T | null> {
		const cachedData = await this.redis.get(key)
		if (!cachedData) return null

		try {
			return JSON.parse(cachedData) as T
		} catch {
			await this.redis.del(key)
			return null
		}
	}

	async set<T>(
		key: string,
		value: T,
		expireTime: number = config.CACHE_EXPIRE_TIME
	): Promise<void> {
		await this.redis.setex(key, expireTime, JSON.stringify(value))
	}

	async del(key: string): Promise<void> {
		await this.redis.del(key)
	}

	async delKeys(keys: string[]): Promise<void> {
		if (!keys.length) return
		await this.redis.del(keys)
	}

	async clearUserCaches(userIds: string[]): Promise<void> {
		for (const id of userIds) {
			await this.del(USER_FILES_KEY(id))
			await this.del(USER_FOLDERS_KEY(id))
		}
	}

	async clearCacheRecursive(folderId: string | null): Promise<void> {
		while (folderId) {
			await this.del(FOLDER_KEY(folderId))

			const parentFolder = await this.prisma.folder.findUnique({
				where: { id: folderId },
				select: { parentId: true },
			})

			folderId = parentFolder?.parentId || null
		}
	}

	async clearFolderCaches(folderIds: string[]): Promise<void> {
		for (const id of folderIds) {
			await this.clearCacheRecursive(id)
		}
	}

	async clearFileCaches(fileIds: string[]): Promise<void> {
		for (const id of fileIds) {
			await this.del(FILE_KEY(id))
		}
	}
}

export const cacheService = new CacheService()
