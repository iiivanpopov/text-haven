import { CloudService } from '@services'

const cloudService = new CloudService()

export class CloudController {
	// async createFile(req: Request, res: Response, next: NextFunction) {
	// 	const { folder, name, content, exposure, expiresAt } = req.body
	// 	const userId = req.user.id
	// 	try {
	// 		const payload = {
	// 			folder,
	// 			name,
	// 			content,
	// 			exposure,
	// 			expiresAt,
	// 			userId,
	// 		}
	// 		await cloudService.createFile(payload)
	// 		res.status(201).json({ message: 'File successfully created' })
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }
	// async deleteFile(req: Request, res: Response, next: NextFunction) {
	// 	const { bucket } = req.body
	// 	const { name } = req.params
	// 	const userId = req.user.id
	// 	try {
	// 		await cloudService.deleteFile({ bucketname: bucket, userId, name })
	// 		res.status(204).send()
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }
	// async getFile(req: Request, res: Response, next: NextFunction) {
	// 	const bucket = req.body.bucket
	// 	const { name } = req.params
	// 	const userId = req.user.id
	// 	try {
	// 		const fileData = await cloudService.getFile({
	// 			bucketname: bucket,
	// 			name,
	// 			userId,
	// 		})
	// 		res.status(200).json({ ...fileData })
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }
	// async getFileByToken(req: Request, res: Response, next: NextFunction) {
	// 	const { token } = req.params
	// 	try {
	// 		const fileData = await cloudService.getFileByToken(token)
	// 		res.status(200).json({ ...fileData })
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }
	// async getFiles(req: Request, res: Response, next: NextFunction) {
	// 	const { bucket } = req.body
	// 	const userId = req.user.id
	// 	try {
	// 		const files = await cloudService.getFiles({ bucketname: bucket, userId })
	// 		res.status(200).json({ files })
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }
	// async createBucket(req: Request, res: Response, next: NextFunction) {
	// 	const { bucket } = req.body
	// 	const userId = req.user.id
	// 	try {
	// 		await cloudService.createBucket({ bucketname: bucket, userId })
	// 		res.status(201).json({ message: 'Bucket successfully created' })
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }
	// async deleteBucket(req: Request, res: Response, next: NextFunction) {
	// 	const { bucket } = req.params
	// 	const userId = req.user.id
	// 	try {
	// 		await cloudService.deleteBucket({ bucketname: bucket, userId })
	// 		res.status(204).send()
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }
	// async getBuckets(req: Request, res: Response, next: NextFunction) {
	// 	const userId = req.user.id
	// 	try {
	// 		const buckets = await cloudService.getBuckets({
	// 			userId,
	// 		})
	// 		res.status(200).json({ buckets })
	// 	} catch (error) {
	// 		next(error)
	// 	}
	// }
}
