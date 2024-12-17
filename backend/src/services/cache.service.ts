import config from '@config'
import { PrismaClient } from '@prisma/client'
import Redis from 'ioredis'

export const FOLDER_KEY = (id: string) => `folder:${id}`
export const FILE_KEY = (id: string) => `file:${id}`
export const USER_FOLDERS_KEY = (userId: string) => `user_folders:${userId}`
export const USER_FILES_KEY = (userId: string) => `user_files:${userId}`

class CacheService {
	private redis: Redis

	constructor(private prisma: PrismaClient) {
		this.redis = new Redis({ host: config.REDIS_HOST, port: config.REDIS_PORT })
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
		await Promise.all(keys.map(key => this.del(key)))
	}

	async clearUserCaches(userIds: string[]): Promise<void> {
		await Promise.all(
			userIds.map(id =>
				Promise.all([
					this.del(USER_FILES_KEY(id)),
					this.del(USER_FOLDERS_KEY(id)),
				])
			)
		)
	}

	async clearCacheIterative(folderId: string | null): Promise<void> {
		let currentFolderId = folderId

		while (currentFolderId) {
			await this.del(FOLDER_KEY(currentFolderId))

			const parentFolder = await this.prisma.folder.findUnique({
				where: { id: currentFolderId },
				select: { parentId: true },
			})

			currentFolderId = parentFolder?.parentId || null
		}
	}

	async clearFolderCaches(folderIds: string[]): Promise<void> {
		for (const id of folderIds) {
			await this.clearCacheIterative(id)
		}
	}

	async clearFileCaches(fileIds: string[]): Promise<void> {
		for (const id of fileIds) {
			await this.del(FILE_KEY(id))
		}
	}
}

export default CacheService
