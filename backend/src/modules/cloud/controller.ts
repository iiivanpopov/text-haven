import type { NextFunction, Request, Response } from 'express'
import CloudService from './service'

class CloudController {
	constructor(private cloudService: CloudService) {}

	createFolder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const userId = req.user.id
			const { name, parentId, exposure } = req.body

			const folder = await this.cloudService.createFolder(userId, parentId, name, exposure)
			res.status(201).json({ folder })
		} catch (error) {
			next(error)
		}
	}

	createFile = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.user.id
			const { name, folderId, expiresAt, exposure, content } = req.body

			const file = await this.cloudService.createFile(
				userId,
				folderId,
				content,
				name,
				exposure,
				expiresAt
			)
			res.status(201).json({ file })
		} catch (error) {
			next(error)
		}
	}

	getFolders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const userId = req.user.id
			const { parentId, targetUserId, folderId } = req.query

			const data = await this.cloudService.getFoldersOrFolder(userId, {
				parentId: parentId as string,
				targetUserId: targetUserId as string,
				folderId: folderId as string,
			})

			res.status(200).json({ data })
		} catch (error) {
			next(error)
		}
	}

	getFilesOrFile = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.user.id
			const { folderId, targetUserId, fileId } = req.query

			const data = await this.cloudService.getFilesOrFile(userId, {
				folderId: folderId as string,
				targetUserId: targetUserId as string,
				fileId: fileId as string,
			})

			res.status(200).json({ data })
		} catch (error) {
			next(error)
		}
	}

	getFileContent = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params
			const userId = req.user.id

			const content = await this.cloudService.getFileContent(id, userId)
			res.status(200).json({ content })
		} catch (error) {
			next(error)
		}
	}

	deleteFolder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
		try {
			const { id } = req.params
			const userId = req.user.id

			const folders = await this.cloudService.deleteFolder(userId, id)
			res.status(200).json({ folders })
		} catch (error) {
			next(error)
		}
	}

	deleteFile = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.user.id
			const { id } = req.params

			const file = await this.cloudService.deleteFile(userId, id)
			res.status(200).json({ file })
		} catch (error) {
			next(error)
		}
	}

	updateFolder = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params
			const userId = req.user.id
			const { body: payload } = req

			const folder = await this.cloudService.updateFolder(userId, id, payload)
			res.status(200).json({ folder })
		} catch (error) {
			next(error)
		}
	}

	updateFile = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params
			const { body: payload } = req
			const userId = req.user.id

			const file = await this.cloudService.updateFile(userId, id, payload)
			res.status(200).json({ file })
		} catch (error) {
			next(error)
		}
	}

	updateFileContent = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params
			const { content } = req.body
			const userId = req.user.id

			const file = await this.cloudService.updateFileContent(userId, id, content)
			res.status(200).json({ file })
		} catch (error) {
			next(error)
		}
	}
}

export default CloudController
