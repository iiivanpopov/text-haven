import FileDto from '@dtos/file.dto'
import FolderDto from '@dtos/folder.dto'
import PrivateUser from '@dtos/private.user.dto'
import ApiError from '@exceptions/ApiError'
import { Exposure, FileType, type File, type Folder, type PrismaClient } from '@prisma'
import { Cache } from '@shared/cache'
import type { S3 } from '@shared/S3'
import logger from '@utils/logger'

type Post = Pick<File, 'createdAt' | 'id' | 'name'> & {
	content: string
}

export default class CloudService {
	constructor(private storageService: S3, private prisma: PrismaClient, private cache: Cache) {}

	async clearExpiredFiles(): Promise<void> {
		const records = await this.prisma.file.findMany({
			where: { expiresAt: { lt: new Date() } },
			select: { id: true, userId: true, folderId: true },
		})

		if (records.length === 0) {
			logger.log('Nothing to clear')
			return
		}
		logger.log(`Clearing ${records.length} expired files`)

		const fileIds = records.map(record => record.id)
		const cacheFlushes = records.map(record =>
			this.cache.flush('file', record.userId, {
				fileId: record.id,
				folderId: record.folderId,
			})
		)

		await Promise.all([
			Promise.all(cacheFlushes),
			this.storageService.deleteFiles(fileIds),
			this.prisma.file.deleteMany({ where: { id: { in: fileIds } } }),
		])
		logger.log(`Successfully cleared ${records.length} expired files`)
	}

	async deleteFolderRecursively(folderId: string): Promise<void> {
		if (!folderId) return

		const [children, files] = await Promise.all([
			this.prisma.folder.findMany({
				where: { parentId: folderId },
				select: { id: true },
			}),
			this.prisma.file.findMany({
				where: { folderId },
				select: { id: true },
			}),
		])

		await Promise.all(children.map(child => this.deleteFolderRecursively(child.id)))

		if (files.length > 0) {
			const fileIds = files.map(file => file.id)
			await Promise.all([
				this.prisma.file.deleteMany({ where: { folderId } }),
				this.storageService.deleteFiles(fileIds),
			])
		}

		await this.prisma.folder.delete({ where: { id: folderId } })
	}

	async getLatestPosts(): Promise<Post[]> {
		const cached = await this.cache.get<Post[]>('post')
		if (cached) return cached

		const latestPosts = await this.prisma.file.findMany({
			where: { type: FileType.POST },
			take: 3,
			orderBy: { createdAt: 'desc' },
			select: { createdAt: true, userId: true, id: true, name: true },
		})
		if (latestPosts.length == 0) return []

		const postsWithContent = await Promise.all(
			latestPosts.map(async post => {
				const content = await this.getFileContent(post.id, post.userId)
				return {
					...post,
					content: content.slice(0, 60),
				}
			})
		)

		await this.cache.set('post', postsWithContent)

		return postsWithContent
	}

	async getFoldersOrFolder(
		userId: string,
		options: { targetUserId?: string; parentId?: string; folderId?: string }
	): Promise<Folder | Folder[]> {
		const { parentId, targetUserId, folderId } = options

		if (folderId) {
			return await this.getSingleFolder(userId, { folderId, targetUserId })
		}

		return await this.getFolderList(userId, { parentId, targetUserId })
	}

	async getSingleFolder(
		userId: string,
		{ folderId, targetUserId }: { folderId?: string; targetUserId?: string }
	): Promise<Folder> {
		const cacheKey = Cache.mapKey('folder', { folderId, userId: targetUserId })
		if (cacheKey) {
			const cached = await this.cache.get<Folder>(cacheKey)
			if (cached && (cached.userId == userId || cached.exposure == Exposure.PUBLIC)) {
				return cached
			}
		}

		const folder = await this.prisma.folder.findFirst({
			where: { id: folderId },
		})
		if (!folder) throw ApiError.NotFound('Folder not found')
		if (folder.userId != userId && folder.exposure != Exposure.PUBLIC) throw ApiError.Forbidden()

		if (cacheKey) await this.cache.set(cacheKey, folder)

		return folder
	}

	async getFolderList(
		userId: string,
		{ targetUserId, parentId }: { targetUserId?: string; parentId?: string }
	): Promise<Folder[]> {
		const isOtherUser = targetUserId && userId != targetUserId
		const effectiveUserId = isOtherUser ? targetUserId : userId

		const where: any = { userId: effectiveUserId, parentId }
		if (isOtherUser) where.exposure = Exposure.PUBLIC

		if (targetUserId && targetUserId != userId) {
			where.exposure = Exposure.PUBLIC
		}

		const cacheKey = Cache.mapKey('folder', {
			userId: effectiveUserId,
			parentId,
			exposure: where.exposure,
		})
		if (cacheKey) {
			const cached = await this.cache.get<Folder[]>(cacheKey)
			if (cached) return cached
		}

		const folders = await this.prisma.folder.findMany({ where })

		if (cacheKey) await this.cache.set(cacheKey, folders)

		return folders
	}

	async deleteFolder(userId: string, id: string): Promise<Folder> {
		const folder = await this.prisma.folder.findFirst({ where: { id } })
		if (!folder) throw ApiError.BadRequest('Folder not found')

		if (folder.userId != userId) throw ApiError.Forbidden()

		await this.cache.clearCacheRecursive(userId, id)
		await this.deleteFolderRecursively(id)

		return folder
	}

	async createFolder(
		userId: string,
		parentId?: string,
		name: string = 'Untitled',
		exposure: Exposure = Exposure.PRIVATE
	): Promise<Folder & { user: PrivateUser }> {
		const user = await this.prisma.user.findUnique({ where: { id: userId } })
		if (!user) throw ApiError.BadRequest('User not found')

		const existingFolder = await this.prisma.folder.findFirst({
			where: { parentId, name, userId },
		})
		if (existingFolder) throw ApiError.BadRequest('Folder already exists')

		if (parentId) {
			const parentFolder = await this.prisma.folder.findUnique({
				where: { id: parentId },
			})
			if (!parentFolder) throw ApiError.BadRequest('Parent folder not found')
		}

		const folder = await this.prisma.folder.create({
			data: { name, userId, parentId, exposure },
		})

		await this.cache.flush('folder', userId)

		return { ...folder, user: new PrivateUser(user) }
	}

	async createFile(
		userId: string,
		folderId: string,
		content: string,
		name: string = 'Untitled',
		exposure: Exposure = Exposure.PRIVATE,
		type: FileType = FileType.NOTE,
		expiresAt: Date = new Date(Number.MAX_SAFE_INTEGER)
	): Promise<File & { user: PrivateUser }> {
		const [folder, user] = await Promise.all([
			this.prisma.folder.findFirst({ where: { id: folderId } }),
			this.prisma.user.findUnique({ where: { id: userId } }),
		])

		if (!folder) throw ApiError.BadRequest('Folder not found')
		if (!user) throw ApiError.BadRequest('User not found')

		const existingFile = await this.prisma.file.findFirst({
			where: { name, userId, folderId },
		})
		if (existingFile) throw ApiError.BadRequest('File already exists')

		const file = await this.prisma.file.create({
			data: { name, folderId, userId, expiresAt, exposure, type },
		})

		await this.cache.flush('file', userId, { folderId })

		if (type == FileType.POST) await this.cache.remove('post')

		await this.storageService.writeFile(file.id, content)

		return { ...file, user: new PrivateUser(user) }
	}

	async deleteFile(userId: string, id: string): Promise<File> {
		const file = await this.prisma.file.findFirst({ where: { id } })
		if (!file) throw ApiError.BadRequest('File not found')

		if (file.userId != userId) throw ApiError.Forbidden()

		await this.cache.flush('file', userId, { fileId: id, folderId: file.folderId })

		if (file.type == FileType.POST) await this.cache.remove('post')

		await this.storageService.deleteFile(id)

		return this.prisma.file.delete({ where: { id } })
	}

	async getFilesOrFile(
		userId: string,
		options: { folderId?: string; targetUserId?: string; fileId?: string }
	): Promise<File | File[]> {
		const { folderId, targetUserId, fileId } = options

		if (fileId) {
			return this.getSingleFile(userId, { fileId, targetUserId, folderId })
		}

		return this.getFileList(userId, { folderId, targetUserId })
	}

	private async getSingleFile(
		userId: string,
		{ fileId, targetUserId, folderId }: { fileId: string; targetUserId?: string; folderId?: string }
	): Promise<File> {
		const cacheKey = Cache.mapKey('file', { fileId, userId: targetUserId, folderId })
		if (cacheKey) {
			const cached = await this.cache.get<File>(cacheKey)

			if (cached && (cached.userId == userId || cached.exposure == Exposure.PUBLIC)) {
				return cached
			}
		}

		const file = await this.prisma.file.findFirst({ where: { id: fileId } })
		if (!file) throw ApiError.BadRequest('File not found')
		if (file.userId != userId && file.exposure != Exposure.PUBLIC) throw ApiError.Forbidden()

		if (cacheKey) await this.cache.set(cacheKey, file)
		return file
	}

	private async getFileList(
		userId: string,
		{ folderId, targetUserId }: { folderId?: string; targetUserId?: string }
	): Promise<File[]> {
		const isOtherUser = targetUserId && userId != targetUserId
		const effectiveUserId = isOtherUser ? targetUserId : userId

		const where: any = { userId: effectiveUserId }
		if (folderId) where.folderId = folderId
		if (isOtherUser) where.exposure = Exposure.PUBLIC

		const cacheKey = Cache.mapKey('file', {
			userId: effectiveUserId,
			folderId,
			exposure: where.exposure,
		})

		if (cacheKey) {
			const cached = await this.cache.get<File[]>(cacheKey)
			if (cached) return cached
		}

		const files = await this.prisma.file.findMany({ where })
		if (cacheKey) await this.cache.set(cacheKey, files)

		return files
	}

	async getFileContent(id: string, userId: string): Promise<string> {
		const file = await this.prisma.file.findUnique({
			where: { id },
			select: { userId: true, exposure: true },
		})
		if (!file) throw ApiError.NotFound(`File with id ${id} not found.`)
		if (file.userId != userId && file.exposure != Exposure.PUBLIC) throw ApiError.Forbidden()

		return this.storageService.getFileContent(id)
	}

	async updateFolder(userId: string, id: string, payload: any): Promise<Folder> {
		const updateData = new FolderDto(payload)
		const oldFolder = await this.prisma.folder.findUnique({
			where: { id },
			select: { userId: true, exposure: true, parentId: true },
		})
		if (!oldFolder) throw ApiError.BadRequest('Folder not found')
		if (userId != oldFolder.userId) throw ApiError.Forbidden()

		await this.cache.flush('folder', oldFolder.userId, {
			folderId: id,
			parentId: oldFolder.parentId ?? undefined,
		})

		return this.prisma.folder.update({ where: { id }, data: updateData })
	}

	async updateFile(userId: string, id: string, payload: any): Promise<File> {
		const updateData = new FileDto(payload)
		const oldFile = await this.prisma.file.findUnique({
			where: { id },
			select: { type: true, userId: true, folderId: true },
		})
		if (!oldFile) throw ApiError.BadRequest('File not found')
		if (userId != oldFile.userId) throw ApiError.Forbidden()

		await this.cache.flush('file', oldFile.userId, { folderId: oldFile.folderId, fileId: id })
		if (oldFile.type == FileType.POST) await this.cache.remove('post')

		return await this.prisma.file.update({ where: { id }, data: updateData })
	}

	async updateFileContent(userId: string, id: string, content: string): Promise<File> {
		const file = await this.prisma.file.findFirst({ where: { id } })
		if (!file) throw ApiError.BadRequest('File not found')

		if (file.userId != userId) throw ApiError.Forbidden()

		await this.storageService.writeFile(id, content)
		return file
	}
}
