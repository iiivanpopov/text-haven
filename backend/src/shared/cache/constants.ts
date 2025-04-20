import { Exposure } from '@prisma'
import type { CacheEntityType, CacheKeyParams } from './types'

export const KEYS: Record<CacheEntityType, (keyof CacheKeyParams)[]> = {
	file: ['fileId', 'folderId', 'userId'],
	folder: ['folderId', 'parentId', 'userId'],
	settings: ['userId'],
	user: ['userId'],
}

export const EXPOSURES: [Exposure, undefined] = ['PUBLIC', undefined]
