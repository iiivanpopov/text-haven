import { BadRequest } from '@curveball/http-errors'
import { s3 } from '@services/s3'
import type { NextFunction, Request, Response } from 'express'
import { prisma } from 'services/database'
import {
	isBucketInDatabase,
	isBucketInS3,
	isFileInDatabase,
	isFileInS3,
} from 'utils/existenceCheck'

export const createFile = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { bucket, file_id, data } = req.body
	const user_id = req.user.id

	try {
		if (
			!(await isBucketInDatabase(bucket, user_id)) ||
			!(await isBucketInS3(bucket))
		) {
			return next(new BadRequest('Bucket does not exist'))
		}

		if (
			(await isFileInDatabase(file_id, user_id, bucket)) ||
			(await isFileInS3(bucket, file_id))
		) {
			throw new Error('File already exists')
		}

		await s3.putObject({
			Bucket: bucket,
			Key: file_id,
			Body: data,
		})

		const bucketRecord = await prisma.bucket.findUnique({
			where: {
				bucketname: bucket,
				userId: user_id,
			},
		})

		await prisma.file.create({
			data: {
				filename: file_id,
				userId: user_id,
				bucketId: bucketRecord!.id,
			},
		})

		res.status(201).json({ message: 'File successfully created' })
	} catch (error) {
		next(error)
	}
}

export const deleteFile = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const bucket = req.body.bucket
	const file_id = req.params.file_id
	const user_id = req.user.id

	if (
		!(await isBucketInDatabase(bucket, user_id)) ||
		!(await isBucketInS3(bucket))
	) {
		return next(new BadRequest('Bucket does not exist'))
	}

	if (
		!(await isFileInDatabase(file_id, user_id, bucket)) ||
		!(await isFileInS3(bucket, file_id))
	) {
		return next(new BadRequest('File does not exist'))
	}

	try {
		const bucketRecord = await prisma.bucket.findUnique({
			where: { userId: user_id, bucketname: bucket },
		})

		await s3.deleteObject({ Bucket: bucket, Key: file_id })

		await prisma.file.delete({
			where: {
				filename: file_id,
				bucketId: bucketRecord!.id,
				userId: user_id,
			},
		})

		res.status(204).send()
	} catch (error) {
		next(error)
	}
}

export const getFileContent = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const bucket = req.body.bucket
	const file_id = req.params.file_id
	const user_id = req.user.id

	if (
		!(await isBucketInDatabase(bucket, user_id)) ||
		!(await isBucketInS3(bucket))
	) {
		return next(new BadRequest('Bucket does not exist'))
	}

	if (
		!(await isFileInDatabase(file_id, user_id, bucket)) ||
		!(await isFileInS3(bucket, file_id))
	) {
		throw new Error('File does not exist')
	}

	try {
		const response = await s3.getObject({ Bucket: bucket, Key: file_id })
		const content = await response.Body?.transformToString()

		res.status(200).json({ content })
	} catch (error) {
		next(error)
	}
}

export const listFiles = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { bucket } = req.body
	const user_id = req.user.id

	if (
		!(await isBucketInDatabase(bucket, user_id)) ||
		!(await isBucketInS3(bucket))
	) {
		return next(new BadRequest('Bucket does not exist'))
	}

	try {
		const files = await prisma.file.findMany({
			where: {
				bucket: {
					bucketname: bucket,
					userId: user_id,
				},
			},
			select: {
				filename: true,
			},
		})

		const fileNames = files.map(({ filename }) => filename)

		res.status(200).json({ files: fileNames })
	} catch (error) {
		next(error)
	}
}

export const createBucket = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const bucket = req.body.bucket
	const user_id = req.user.id

	if (
		(await isBucketInDatabase(bucket, user_id)) ||
		(await isBucketInS3(bucket))
	) {
		return next(new BadRequest('Bucket already exists'))
	}

	try {
		await s3.createBucket({ Bucket: bucket })

		await prisma.bucket.create({
			data: {
				userId: user_id,
				bucketname: bucket,
			},
		})

		res.status(201).json({ message: 'Bucket successfully created' })
	} catch (error) {
		next(error)
	}
}

export const deleteBucket = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const bucket = req.params.bucket_id
	const user_id = req.user.id

	if (
		!(await isBucketInDatabase(bucket, user_id)) ||
		!(await isBucketInS3(bucket))
	) {
		return next(new BadRequest('Bucket does not exist'))
	}

	try {
		const response = await s3.listObjectsV2({ Bucket: bucket })
		const Contents = response.Contents || []

		if (Contents.length > 0) {
			await s3.deleteObjects({
				Bucket: bucket,
				Delete: {
					Objects: Contents.map(({ Key }) => ({ Key })),
				},
			})
		}

		await s3.deleteBucket({ Bucket: bucket })

		await prisma.bucket.delete({
			where: {
				bucketname: bucket,
				userId: user_id,
			},
		})

		res.status(204).send()
	} catch (error) {
		next(error)
	}
}
