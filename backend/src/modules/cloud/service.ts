import ApiError from '@exceptions/ApiError'
import { Exposure, PrismaClient, type File, type Folder } from '@prisma/client'
import CacheService, {
	FILE_KEY,
	FOLDER_KEY,
	USER_FILES_KEY,
	USER_FOLDERS_KEY,
} from '@services/cache.service'
import type StorageService from '@services/storage.service'
import logger from '@utils/logger'
import { prisma } from '@utils/prisma'

class CloudService {
	private prisma: PrismaClient
	private cacheService: CacheService

	constructor(private storageService: StorageService) {
		this.prisma = prisma
		this.cacheService = new CacheService(this.prisma)
	}

	async clearExpiredFiles(): Promise<void> {
		const now = new Date()
		const records = await this.prisma.file.findMany({
			where: { expiresAt: { lt: now } },
		})
		if (!records.length) return

		logger.log(`Clearing ${records.length} records`)

		const fileIds = records.map(record => record.id)
		const userIds = [...new Set(records.map(record => record.userId))]
		const folderIds = [...new Set(records.map(record => record.folderId))]

		await Promise.allSettled([
			this.storageService.deleteFiles(fileIds),
			this.prisma.file.deleteMany({ where: { id: { in: fileIds } } }),
			this.cacheService.clearUserCaches(userIds),
			this.cacheService.clearFolderCaches(folderIds),
			this.cacheService.clearFileCaches(fileIds),
		])

		logger.log(`Cleared ${records.length} records`)
	}

	async getFolders(userId: string): Promise<Folder[]> {
		const cached = await this.cacheService.get<Folder[]>(
			USER_FOLDERS_KEY(userId)
		)

		if (cached) {
			return cached
		}

		const folders = await this.prisma.folder.findMany({
			where: { userId },
		})

		await this.cacheService.set<Folder[]>(USER_FOLDERS_KEY(userId), folders)
		return folders
	}

	async getFolder(id: string): Promise<Folder> {
		const cached = await this.cacheService.get<Folder>(FOLDER_KEY(id))

		if (cached) {
			return cached
		}

		const folder = await this.prisma.folder.findFirst({
			where: { id },
			include: { Files: true },
		})
		if (!folder) {
			throw ApiError.NotFound('Folder not found')
		}

		await this.cacheService.set<Folder>(FOLDER_KEY(id), folder)
		return folder
	}

	async deleteFolderRecursive(id: string): Promise<void> {
		const stack = [id]

		while (stack.length > 0) {
			const currentId = stack.pop()!

			const subfolders = await this.prisma.folder.findMany({
				where: { parentId: currentId },
				include: { Files: true },
			})

			subfolders.forEach(subfolder => stack.push(subfolder.id))

			await this.prisma.folder.delete({ where: { id: currentId } })
		}
	}

	async deleteFolder(id: string): Promise<Folder> {
		const folder = await this.prisma.folder.findFirst({ where: { id } })
		if (!folder) {
			throw ApiError.BadRequest('Folder not found')
		}

		await this.deleteFolderRecursive(id)

		await this.cacheService.clearCacheIterative(id)
		await this.cacheService.del(USER_FOLDERS_KEY(folder.userId))
		await this.cacheService.del(USER_FILES_KEY(folder.userId))

		return folder
	}

	async createFolder(
		name: string,
		userId: string,
		parentId?: string
	): Promise<Folder> {
		const folder = await this.prisma.folder.findFirst({
			where: {
				parentId,
				name,
				userId,
			},
		})

		if (folder) {
			throw ApiError.BadRequest('Folder already exists')
		}

		if (parentId) {
			const parentFolder = await this.prisma.folder.findUnique({
				where: { id: parentId },
			})
			if (!parentFolder) {
				throw ApiError.BadRequest('Parent folder not found')
			}
			await this.cacheService.clearCacheIterative(parentId)
		}

		await this.cacheService.del(USER_FOLDERS_KEY(userId))

		return this.prisma.folder.create({
			data: { name, userId, parentId },
		})
	}

	async createFile(
		name: string,
		userId: string,
		folderId: string,
		exposure: Exposure,
		content: string,
		expiresAt: Date = new Date(Number.MAX_SAFE_INTEGER)
	): Promise<File> {
		const folder = await this.prisma.folder.findFirst({
			where: { id: folderId },
		})

		if (!folder) {
			throw ApiError.BadRequest('Folder not found')
		}

		const fileExist = await this.prisma.file.findFirst({
			where: {
				name,
				userId,
				folderId,
			},
		})

		if (fileExist) {
			throw ApiError.BadRequest('File already exists')
		}

		const file = await this.prisma.file.create({
			data: {
				name,
				folderId,
				userId,
				expiresAt: new Date(expiresAt),
				exposure,
			},
		})

		await this.cacheService.clearCacheIterative(folderId)
		await this.cacheService.del(USER_FILES_KEY(file.userId))
		await this.cacheService.del(USER_FOLDERS_KEY(file.userId))

		await this.storageService.createFile(file.id, content)

		await this.cacheService.set<File>(FILE_KEY(file.id), file)

		return file
	}

	async deleteFile(id: string): Promise<File> {
		const file = await this.prisma.file.findFirst({ where: { id } })
		if (!file) {
			throw ApiError.BadRequest('File not found')
		}

		await this.cacheService.del(FILE_KEY(id))
		await this.cacheService.del(USER_FILES_KEY(file.userId))
		await this.cacheService.del(USER_FOLDERS_KEY(file.userId))
		await this.cacheService.clearCacheIterative(file.folderId)

		await this.storageService.deleteFile(id)

		return this.prisma.file.delete({ where: { id } })
	}

	async getFile(id: string, userId: string): Promise<File> {
		const cached = await this.cacheService.get<File>(FILE_KEY(id))
		if (cached && userId == cached.userId) return cached

		const file = await this.prisma.file.findFirst({ where: { id } })
		if (!file) {
			throw ApiError.BadRequest('File not found')
		}

		if (userId != file.userId && file.exposure == Exposure.PRIVATE) {
			throw ApiError.Forbidden()
		}

		await this.cacheService.set<File>(FILE_KEY(id), file)

		return file
	}

	async getFiles(userId: string): Promise<File[]> {
		const cached = await this.cacheService.get<File[]>(USER_FILES_KEY(userId))

		if (cached) {
			return cached
		}

		const files = await this.prisma.file.findMany({ where: { userId } })

		await this.cacheService.set<File[]>(USER_FILES_KEY(userId), files)
		return files
	}

	async getFileContent(
		id: string,
		userId: string
	): Promise<{ content: string }> {
		const file = await this.prisma.file.findUnique({
			where: { id },
			select: { name: true, userId: true, exposure: true },
		})

		if (!file) {
			throw ApiError.NotFound(`File with id ${id} not found.`)
		}

		if (userId != file.userId && file.exposure == Exposure.PRIVATE) {
			throw ApiError.Forbidden()
		}

		const content = await this.storageService.getFileContent(id)
		return { content }
	}

	async updateFolder(
		id: string,
		folder: Partial<Omit<Folder, 'id' | 'userId'>>
	): Promise<Folder> {
		const oldFolder = await this.prisma.folder.findUnique({ where: { id } })
		if (!oldFolder) {
			throw ApiError.BadRequest('Folder not found')
		}

		await this.cacheService.clearCacheIterative(id)
		await this.cacheService.del(USER_FOLDERS_KEY(oldFolder.userId))

		const updatedFolder = await this.prisma.folder.update({
			where: { id },
			data: { ...folder },
		})

		return updatedFolder
	}

	async updateFile(
		id: string,
		file: Partial<Omit<File, 'userId' | 'id'>>
	): Promise<File> {
		const oldFile = await this.prisma.file.findUnique({ where: { id } })
		if (!oldFile) {
			throw ApiError.BadRequest('File not found')
		}

		await this.cacheService.clearCacheIterative(oldFile.folderId)
		await this.cacheService.del(FILE_KEY(id))
		await this.cacheService.del(USER_FILES_KEY(oldFile.userId))
		await this.cacheService.del(USER_FOLDERS_KEY(oldFile.userId))

		const updatedFile = await this.prisma.file.update({
			where: { id },
			data: { ...file },
		})

		return updatedFile
	}

	async updateFileContent(id: string, content: string): Promise<File> {
		const file = await this.prisma.file.findFirst({
			where: { id },
		})
		if (!file) {
			throw ApiError.BadRequest('File not found.')
		}

		await this.storageService.updateFile(id, content)

		return file
	}
}

export default CloudService
