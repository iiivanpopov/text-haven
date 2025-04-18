import type { PrismaClient } from '@prisma'
import type { RedisClient } from 'bun'

type cacheObjectType = 'file' | 'folder' | 'settings' | 'user'
export default class Cache {
	constructor(
		private redis: RedisClient,
		private prisma: PrismaClient,
		private cacheExpireTime: number
	) {}

	static mapKey = (
		type: cacheObjectType,
		{
			userId,
			folderId,
			fileId,
			parentId,
			additional,
		}: {
			additional?: string
			userId?: string
			parentId?: string
			folderId?: string
			fileId?: string
		} = {}
	): string => {
		const keySources: [string, string | undefined, boolean][] = [
			['fileId', fileId, type == 'file'],
			['folderId', folderId, type == 'file' || type == 'folder'],
			['parentId', parentId, type == 'folder'],
			['userId', userId, ['file', 'folder', 'settings', 'user'].includes(type)],
		]

		for (const [key, val, isValid] of keySources) {
			if (isValid && val) {
				const parts = [type, val]
				if (additional) parts.push(additional)
				parts.push(key)
				return parts.join(':')
			}
		}

		throw new Error('Bad usage: No valid identifier provided for the given type.')
	}

	flush = async (
		type: cacheObjectType,
		userId: string,
		opts: { folderId?: string; fileId?: string; parentId?: string } = {}
	) => {
		const { folderId, fileId, parentId } = opts
		const keys = [
			Cache.mapKey(type, { userId }),
			folderId && Cache.mapKey(type, { folderId }),
			parentId && Cache.mapKey(type, { parentId }),
			fileId && Cache.mapKey(type, { fileId }),
		].filter(Boolean) as string[]

		await Promise.all(keys.map(this.remove))
	}

	set = async (key: string, value: any, expiration: number = this.cacheExpireTime) => {
		await this.redis.set(key, JSON.stringify(value), 'PX', expiration)
	}

	remove = async (key: string | string[]): Promise<void> => {
		if (Array.isArray(key)) await Promise.all(key.map(k => this.redis.del(k)))
		else await this.redis.del(key)
	}

	get = async <T>(key: string): Promise<T | null> => {
		const data = await this.redis.get(key)
		return data ? JSON.parse(data) : null
	}

	async clearCacheRecursive(userId: string, folderId?: string): Promise<void> {
		const parentFolder = await this.prisma.folder.findUnique({
			where: { id: folderId },
			select: { parentId: true, id: true },
		})

		await this.flush('folder', userId, { folderId, parentId: parentFolder?.id })
		await this.flush('file', userId, { folderId })

		if (parentFolder?.parentId) {
			await this.clearCacheRecursive(userId, parentFolder.parentId)
		}
	}
}
