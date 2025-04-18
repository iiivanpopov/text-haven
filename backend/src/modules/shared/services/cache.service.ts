import { PrismaClient } from '@prisma'
import { Redis } from 'ioredis'

export default class Cache {
	constructor(
		private redis: Redis,
		private prisma: PrismaClient,
		private cacheExpireTime: number
	) {}

	static FOLDER_KEY = (id: string): string => `folder:${id}`
	static FILE_KEY = (id: string): string => `file:${id}`
	static USER_FOLDERS_KEY = (userId: string): string => `user_folders:${userId}`
	static USER_FILES_KEY = (userId: string): string => `user_files:${userId}`

	set = async (key: string, value: any, expiration: number = this.cacheExpireTime) =>
		await this.redis.setex(key, expiration, JSON.stringify(value))

	remove = async (key: string | string[]): Promise<void> => {
		if (typeof key == 'string') await this.redis.del(key)
		else if (key.length) await Promise.all(key.map(k => this.redis.del(k)))
	}

	get = async <T>(key: string): Promise<T | null> => {
		const data = await this.redis.get(key)
		return data ? JSON.parse(data) : null
	}

	clearUserCaches = async (userIds: string[]): Promise<void> => {
		await Promise.all(userIds.flatMap(id => [Cache.USER_FILES_KEY(id), Cache.USER_FOLDERS_KEY(id)]))
	}

	clearCacheRecursive = async (folderId: string | null): Promise<void> => {
		while (folderId) {
			await this.remove(Cache.FOLDER_KEY(folderId))

			const parentFolderId = await this.prisma.folder
				.findUnique({
					where: { id: folderId },
					select: { parentId: true },
				})
				.then(folder => folder?.parentId || null)

			folderId = parentFolderId
		}
	}

	async flushCache(userId: string, folderId?: string, fileId?: string): Promise<void> {
		const cacheClearPromises = [
			this.remove(Cache.USER_FILES_KEY(userId)),
			this.remove(Cache.USER_FOLDERS_KEY(userId)),
		]
		if (folderId) cacheClearPromises.push(this.clearCacheRecursive(folderId))
		if (fileId) cacheClearPromises.push(this.remove(Cache.FILE_KEY(fileId)))
		await Promise.all(cacheClearPromises)
	}

	clearFolderCaches = async (folderIds: string[]): Promise<void> => {
		for (const id of folderIds) {
			await this.clearCacheRecursive(id)
		}
	}

	clearFileCaches = async (fileIds: string[]): Promise<void> => {
		await this.remove(fileIds.map(id => Cache.FILE_KEY(id)))
	}
}
