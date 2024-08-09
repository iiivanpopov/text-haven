import { prisma } from '@helpers/database'
import type { NextFunction, Request, Response } from 'express'

export const ensureBucketOwnership = async (req: Request, res: Response, next: NextFunction) => {
	const bucket = req.body.bucket || req.params.bucket_id
	const user_id = req.user.id

	try {
		const existingBucket = await prisma.bucket.findFirst({
			where: {
				bucketname: bucket,
				userId: user_id,
			},
		})

		if (!existingBucket) {
			return res.status(403).json({ message: 'Access denied: You do not own this bucket' })
		}

		next()
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error checking bucket ownership' })
	}
}

export const ensureFileOwnership = async (req: Request, res: Response, next: NextFunction) => {
	const file_id = req.params.file_id || req.body.file_id
	const bucket = req.body.bucket
	const user_id = req.user.id

	try {
		const existingFile = await prisma.file.findFirst({
			where: {
				filename: `${bucket}:${file_id}`,
				userId: user_id,
				bucket: {
					bucketname: bucket,
					userId: user_id,
				},
			},
		})

		if (!existingFile) {
			return res.status(403).json({ message: 'Access denied: You do not own this file' })
		}

		next()
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error checking file ownership' })
	}
}
