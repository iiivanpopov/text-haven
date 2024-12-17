import FileDto from '@dtos/file.dto'
import FolderDto from '@dtos/folder.dto'
import type { NextFunction, Request, Response } from 'express'
import CloudService from './service'

class CloudController {
	constructor(private cloudService: CloudService) {}

	createFolder = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const userId = req.user.id
			const { name, parentId } = req.body

			const folder = await this.cloudService.createFolder(
				name,
				userId,
				parentId
			)
			res.status(201).json({ folder })
		} catch (error) {
			next(error)
		}
	}

	getFolders = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const userId = req.user.id

			const folders = await this.cloudService.getFolders(userId)
			res.status(200).json({ folders })
		} catch (error) {
			next(error)
		}
	}

	getFolder = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const { id } = req.params

			const folder = await this.cloudService.getFolder(id)
			res.status(200).json({ folder })
		} catch (error) {
			next(error)
		}
	}

	deleteFolder = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const { id } = req.params

			const folders = await this.cloudService.deleteFolder(id)
			res.status(200).json({ folders })
		} catch (error) {
			next(error)
		}
	}

	createFile = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.user.id
			const { name, folderId, expiresAt, exposure, content } = req.body

			const file = await this.cloudService.createFile(
				name,
				userId,
				folderId,
				exposure,
				content,
				expiresAt
			)
			res.status(201).json({ file })
		} catch (error) {
			next(error)
		}
	}

	deleteFile = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params

			const file = await this.cloudService.deleteFile(id)
			res.status(200).json({ file })
		} catch (error) {
			next(error)
		}
	}

	getFile = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.user?.id
			const { id } = req.params

			const file = await this.cloudService.getFile(id, userId)
			res.status(200).json({ file })
		} catch (error) {
			next(error)
		}
	}

	getFiles = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.user.id

			const files = await this.cloudService.getFiles(userId)
			res.status(200).json({ files })
		} catch (error) {
			next(error)
		}
	}

	getFileContent = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params
			const userId = req.user.id

			const { content } = await this.cloudService.getFileContent(id, userId)
			res.status(200).json({ content })
		} catch (error) {
			next(error)
		}
	}

	updateFolder = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params
			const folderDto = new FolderDto(req.body)

			const folder = await this.cloudService.updateFolder(id, folderDto)
			res.status(200).json({ folder })
		} catch (error) {
			next(error)
		}
	}

	updateFile = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params
			const fileDto = new FileDto(req.body)

			const file = await this.cloudService.updateFile(id, fileDto)
			res.status(200).json({ file })
		} catch (error) {
			next(error)
		}
	}

	updateFileContent = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			const { id } = req.params
			const { content } = req.body

			const file = await this.cloudService.updateFileContent(id, content)
			res.status(200).json({ folder: file })
		} catch (error) {
			next(error)
		}
	}
}

export default CloudController
