import FileDto from '@dtos/file.dto'
import FolderDto from '@dtos/folder.dto'
import ApiError from '@exceptions/ApiError'
import Cache from '@modules/shared/services/cache.service'
import type StorageService from '@modules/shared/services/storage.service'
import {
	Exposure,
	type File,
	type Folder,
	type PrismaClient,
} from '@prisma/client'
import logger from '@utils/logger'

type FolderHierarchy = Folder & { Files: File[]; Folders: Folder[] }

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

	private async handleCacheClear(
		userId: string,
		folderId?: string,
		fileId?: string
	): Promise<void> {
		const cacheClearPromises = [
			this.cache.remove(Cache.USER_FILES_KEY(userId)),
			this.cache.remove(Cache.USER_FOLDERS_KEY(userId)),
		]
		if (folderId)
			cacheClearPromises.push(this.cache.clearCacheRecursive(folderId))
		if (fileId)
			cacheClearPromises.push(this.cache.remove(Cache.FILE_KEY(fileId)))
		await Promise.all(cacheClearPromises)
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

	async getFolders(
		userId: string,
		options: { uid?: string; parentId?: string }
	): Promise<FolderHierarchy[]> {
		const cached = await this.cache.get<FolderHierarchy[]>(
			Cache.USER_FOLDERS_KEY(userId)
		)
		if (cached) {
			return cached
				.map(folder => ({
					...folder,
					Files: folder.Files.filter(
						file => file.userId === userId || file.exposure === Exposure.PUBLIC
					),
				}))
				.filter(
					folder =>
						folder.userId === userId || folder.exposure === Exposure.PUBLIC
				)
		}

		const { parentId, uid } = options

		const where: {
			userId?: string
			parentId?: string
			exposure?: Exposure
		} = {
			userId,
			parentId,
		}

		const include = {
			Files: true,
			Folders: true,
		}

		if (uid && uid !== userId) {
			Object.assign(where, {
				userId: uid,
				exposure: Exposure.PUBLIC,
			})
			Object.assign(include, {
				Files: { where: { exposure: Exposure.PUBLIC } },
				Folders: { where: { exposure: Exposure.PUBLIC } },
			})
		}

		const folders = await this.prisma.folder.findMany({ where, include })
		await this.cache.set(Cache.USER_FOLDERS_KEY(userId), folders)
		return folders
	}

	async getFolder(userId: string, id: string): Promise<Folder> {
		const cached = await this.cache.get<Folder>(Cache.FOLDER_KEY(id))
		if (
			cached &&
			(cached.userId === userId || cached.exposure === Exposure.PUBLIC)
		)
			return cached

		const folder = await this.prisma.folder.findFirst({
			where: { id },
			include: { Files: true },
		})
		if (!folder) throw ApiError.NotFound('Folder not found')
		if (folder.userId !== userId && folder.exposure === Exposure.PRIVATE)
			throw ApiError.Forbidden()

		await this.cache.set(Cache.FOLDER_KEY(id), folder)
		return folder
	}

	async deleteFolder(id: string): Promise<Folder> {
		const folder = await this.prisma.folder.findFirst({ where: { id } })
		if (!folder) throw ApiError.BadRequest('Folder not found')

		await this.handleCacheClear(folder.userId, id)
		await this.deleteFolderRecursive(id)
		return folder
	}

	async createFolder(
		name: string,
		userId: string,
		parentId?: string,
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
		if (!folder) throw ApiError.BadRequest('Folder not found')

		const existingFile = await this.prisma.file.findFirst({
			where: { name, userId, folderId },
		})
		if (existingFile) throw ApiError.BadRequest('File already exists')

		const file = await this.prisma.file.create({
			data: { name, folderId, userId, expiresAt, exposure },
		})
		await this.handleCacheClear(userId, folderId)
		await this.storageService.createFile(file.id, content)
		await this.cache.set(Cache.FILE_KEY(file.id), file)
		return file
	}

	async deleteFile(id: string): Promise<File> {
		const file = await this.prisma.file.findFirst({ where: { id } })
		if (!file) throw ApiError.BadRequest('File not found')

		await this.handleCacheClear(file.userId, file.folderId, id)
		await this.storageService.deleteFile(id)
		return this.prisma.file.delete({ where: { id } })
	}

	async getFiles(
		userId: string,
		options: { folderId?: string; uid?: string }
	): Promise<File[]> {
		const cached = await this.cache.get<File[]>(Cache.USER_FILES_KEY(userId))
		if (cached) {
			return cached.filter(
				file => file.userId === userId || file.exposure !== Exposure.PRIVATE
			)
		}

		const { folderId, uid } = options
		const where: any = { userId, folderId }

		if (uid && userId !== uid) {
			where.userId = uid
			where.exposure = Exposure.PUBLIC
		}

		return this.prisma.file.findMany({ where })
	}

	async getFile(id: string, userId: string): Promise<File> {
		const cached = await this.cache.get<File>(Cache.FILE_KEY(id))
		if (
			cached &&
			(cached.userId === userId || cached.exposure === Exposure.PUBLIC)
		)
			return cached

		const file = await this.prisma.file.findFirst({ where: { id } })
		if (!file) throw ApiError.BadRequest('File not found')
		if (file.userId !== userId && file.exposure === Exposure.PRIVATE)
			throw ApiError.Forbidden()

		await this.cache.set(Cache.FILE_KEY(id), file)
		return file
	}

	async getFileContent(id: string, userId: string): Promise<string> {
		const file = await this.prisma.file.findUnique({
			where: { id },
			select: { userId: true, exposure: true },
		})
		if (!file) throw ApiError.NotFound(`File with id ${id} not found.`)
		if (file.userId !== userId && file.exposure === Exposure.PRIVATE)
			throw ApiError.Forbidden()

		return this.storageService.getFileContent(id)
	}

	async updateFolder(id: string, payload: any): Promise<Folder> {
		const updateData = new FolderDto(payload)
		const oldFolder = await this.prisma.folder.findUnique({ where: { id } })
		if (!oldFolder) throw ApiError.BadRequest('Folder not found')

		await this.handleCacheClear(oldFolder.userId, id)
		return this.prisma.folder.update({ where: { id }, data: updateData })
	}

	async updateFile(id: string, payload: any): Promise<File> {
		const updateData = new FileDto(payload)
		const oldFile = await this.prisma.file.findUnique({ where: { id } })
		if (!oldFile) throw ApiError.BadRequest('File not found')

		await this.handleCacheClear(oldFile.userId, oldFile.folderId, id)
		return this.prisma.file.update({ where: { id }, data: updateData })
	}

	async updateFileContent(id: string, content: string): Promise<File> {
		const file = await this.prisma.file.findFirst({ where: { id } })
		if (!file) throw ApiError.BadRequest('File not found')

		await this.storageService.updateFile(id, content)
		return file
	}
}
