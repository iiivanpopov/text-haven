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
			const { name, parentId, exposure } = req.body

			const folder = await this.cloudService.createFolder(
				name,
				userId,
				parentId,
				exposure
			)
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

	// get all user folders / user folders by parentId and uid(optional)
	getFolders = async (
		req: Request,
		res: Response,
		next: NextFunction
	): Promise<void> => {
		try {
			const userId = req.user.id
			const { parentId, uid } = req.query

			const folders = await this.cloudService.getFolders(userId, {
				parentId: parentId as string,
				uid: uid as string,
			})

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
			const { userId } = req.user.id

			const folder = await this.cloudService.getFolder(userId, id)
			res.status(200).json({ folder })
		} catch (error) {
			next(error)
		}
	}

	// get all files / get by folderId and uid(optional)
	getFiles = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.user.id
			const { folderId, uid } = req.query

			const files = await this.cloudService.getFiles(userId, {
				folderId: folderId as string,
				uid: uid as string,
			})

			res.status(200).json({ files })
		} catch (error) {
			next(error)
		}
	}

	getFile = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.user.id
			const { id } = req.params

			const file = await this.cloudService.getFile(id, userId)
			res.status(200).json({ file })
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

	deleteFile = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params

			const file = await this.cloudService.deleteFile(id)
			res.status(200).json({ file })
		} catch (error) {
			next(error)
		}
	}

	updateFolder = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params
			const { body } = req

			const folder = await this.cloudService.updateFolder(id, body)
			res.status(200).json({ folder })
		} catch (error) {
			next(error)
		}
	}

	updateFile = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params
			const { body } = req

			const file = await this.cloudService.updateFile(id, body)
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
