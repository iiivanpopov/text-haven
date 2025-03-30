import ApiError from '@exceptions/ApiError'
import FileDto from '@modules/cloud/dtos/file.dto'
import FolderDto from '@modules/cloud/dtos/folder.dto'
import Cache from '@modules/shared/services/cache.service'
import type StorageService from '@modules/shared/services/storage.service'
import { Exposure, type File, type Folder, type PrismaClient } from '@prisma/client'
import logger from '@utils/logger'

export default class CloudService {
	constructor(
		private storageService: StorageService,
		private prisma: PrismaClient,
		private cache: Cache
	) {}

	private async deleteFolderRecursive(id: string): Promise<void> {
		if (!id) return

		const stack = [id]
		while (stack.length) {
			const currentId = stack.pop()!
			const subfolders = await this.prisma.folder.findMany({
				where: { parentId: currentId },
				select: { id: true },
			})
			stack.push(...subfolders.map(subfolder => subfolder.id))
			await this.prisma.folder.delete({ where: { id: currentId } })
		}
	}

	async clearExpiredFiles(): Promise<void> {
		const now = new Date()
		const records = await this.prisma.file.findMany({
			where: { expiresAt: { lt: now } },
		})
		if (!records.length) return

		logger.log(`Clearing ${records.length} expired files`)

		const fileIds = records.map(record => record.id)
		const userIds = [...new Set(records.map(record => record.userId))]
		const folderIds = [...new Set(records.map(record => record.folderId))]

		await Promise.allSettled([
			this.storageService.deleteFiles(fileIds),
			this.prisma.file.deleteMany({ where: { id: { in: fileIds } } }),
			this.cache.clearUserCaches(userIds),
			this.cache.clearFolderCaches(folderIds),
			this.cache.clearFileCaches(fileIds),
		])

		logger.log(`Cleared ${records.length} expired files`)
	}

	// Return single folder(if folderId provided) or return all user folders(in specific folder if provided)
	async getFoldersOrFolder(
		userId: string,
		options: { targetUserId?: string; parentId?: string; folderId?: string }
	): Promise<Folder | Folder[]> {
		const { parentId, targetUserId, folderId } = options

		if (folderId) {
			const cached = await this.cache.get<Folder>(Cache.FOLDER_KEY(folderId))
			if (cached && (cached.userId == targetUserId || cached.exposure == Exposure.PUBLIC)) {
				return cached
			}

			const folder = await this.prisma.folder.findFirst({
				where: { id: folderId },
			})
			if (!folder) throw ApiError.NotFound('Folder not found')

			if (folder.userId != userId && folder.exposure != Exposure.PUBLIC) throw ApiError.Forbidden()

			await this.cache.set(Cache.FOLDER_KEY(folderId), folder)

			return folder
		}

		const where: any = {
			userId: targetUserId,
			id: folderId,
			parentId,
		}

		if (targetUserId && targetUserId != userId) {
			where.exposure = Exposure.PUBLIC
		}

		return this.prisma.folder.findMany({ where })
	}

	async deleteFolder(userId: string, id: string): Promise<Folder> {
		const folder = await this.prisma.folder.findFirst({ where: { id } })
		if (!folder) throw ApiError.BadRequest('Folder not found')

		if (folder.userId != userId) throw ApiError.Forbidden()

		await this.cache.flushCache(folder.userId, id)
		await this.deleteFolderRecursive(id)
		return folder
	}

	async createFolder(
		userId: string,
		parentId?: string,
		name: string = 'Unnamed',
		exposure: Exposure = Exposure.PRIVATE
	): Promise<Folder> {
		const existingFolder = await this.prisma.folder.findFirst({
			where: { parentId, name, userId },
		})
		if (existingFolder) throw ApiError.BadRequest('Folder already exists')

		if (parentId) {
			const parentFolder = await this.prisma.folder.findUnique({
				where: { id: parentId },
			})
			if (!parentFolder) throw ApiError.BadRequest('Parent folder not found')
			await this.cache.clearCacheRecursive(parentId)
		}

		await this.cache.remove(Cache.USER_FOLDERS_KEY(userId))
		return this.prisma.folder.create({
			data: { name, userId, parentId, exposure },
		})
	}

	async createFile(
		userId: string,
		folderId: string,
		content: string,
		name: string = 'Unnamed',
		exposure: Exposure = Exposure.PRIVATE,
		expiresAt: Date = new Date(Number.MAX_SAFE_INTEGER)
	): Promise<File> {
		const folder = await this.prisma.folder.findFirst({
			where: { id: folderId },
		})
		if (!folder) throw ApiError.BadRequest('Folder not found')

		const existingFile = await this.prisma.file.findFirst({
			where: { name, userId, folderId },
		})
		if (existingFile) throw ApiError.BadRequest('File already exists')

		const file = await this.prisma.file.create({
			data: { name, folderId, userId, expiresAt, exposure },
		})
		await this.cache.flushCache(userId, folderId)
		await this.storageService.createFile(file.id, content)
		return file
	}

	async deleteFile(userId: string, id: string): Promise<File> {
		const file = await this.prisma.file.findFirst({ where: { id } })
		if (!file) throw ApiError.BadRequest('File not found')

		if (file.userId != userId) throw ApiError.Forbidden()

		await this.cache.flushCache(file.userId, file.folderId, id)
		await this.storageService.deleteFile(id)
		return this.prisma.file.delete({ where: { id } })
	}

	// Return single file(if fileId provided) or return all user files(in specific folder if provided)
	async getFilesOrFile(
		userId: string,
		options: { folderId?: string; targetUserId?: string; fileId?: string }
	): Promise<File | File[]> {
		const { folderId, targetUserId, fileId } = options

		if (fileId) {
			const cached = await this.cache.get<File>(Cache.FILE_KEY(fileId))
			if (cached && (cached.userId == userId || cached.exposure == Exposure.PUBLIC)) return cached

			const file = await this.prisma.file.findFirst({ where: { id: fileId } })
			if (!file) throw ApiError.BadRequest('File not found')
			if (file.userId != userId && file.exposure != Exposure.PUBLIC) throw ApiError.Forbidden()

			await this.cache.set(Cache.FILE_KEY(fileId), file)
			return file
		}

		const where: any = { userId, folderId, id: fileId }

		if (targetUserId && userId != targetUserId) {
			where.exposure = Exposure.PUBLIC
		}

		return this.prisma.file.findMany({ where })
	}

	async getFileContent(id: string, userId: string): Promise<string> {
		const file = await this.prisma.file.findUnique({
			where: { id },
			select: { userId: true, exposure: true },
		})
		if (!file) throw ApiError.NotFound(`File with id ${id} not found.`)
		if (file.userId !== userId && file.exposure !== Exposure.PUBLIC) throw ApiError.Forbidden()

		return this.storageService.getFileContent(id)
	}

	async updateFolder(userId: string, id: string, payload: any): Promise<Folder> {
		const updateData = new FolderDto(payload)
		const oldFolder = await this.prisma.folder.findUnique({
			where: { id },
			select: { userId: true, exposure: true },
		})
		if (!oldFolder) throw ApiError.BadRequest('Folder not found')
		if (userId != oldFolder.userId) throw ApiError.Forbidden()

		await this.cache.flushCache(oldFolder.userId, id)
		return this.prisma.folder.update({ where: { id }, data: updateData })
	}

	async updateFile(userId: string, id: string, payload: any): Promise<File> {
		const updateData = new FileDto(payload)
		const oldFile = await this.prisma.file.findUnique({
			where: { id },
			select: { userId: true, folderId: true },
		})
		if (!oldFile) throw ApiError.BadRequest('File not found')
		if (userId != oldFile.userId) throw ApiError.Forbidden()

		await this.cache.flushCache(oldFile.userId, oldFile.folderId, id)
		return this.prisma.file.update({ where: { id }, data: updateData })
	}

	async updateFileContent(userId: string, id: string, content: string): Promise<File> {
		const file = await this.prisma.file.findFirst({ where: { id } })
		if (!file) throw ApiError.BadRequest('File not found')

		if (file.userId != userId) throw ApiError.Forbidden()

		await this.storageService.updateFile(id, content)
		return file
	}
}
