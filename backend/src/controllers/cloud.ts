import { prisma } from '@helpers/database'
import { bucketExists, objectExists } from '@helpers/existenceCheck'
import { s3 } from '@helpers/s3'
import type { Request, Response } from 'express'

export const createFile = async (req: Request, res: Response) => {
	const { bucket, file_id, data } = req.body
	const user_id = req.user.id

	if (await objectExists(bucket, file_id, user_id)) {
		return res.status(400).json({ message: 'File already exists' })
	}

	try {
		await s3.putObject({
			Bucket: bucket,
			Key: file_id,
			Body: data,
		})
		const bucketRecord = await prisma.bucket.findFirst({
			where: {
				bucketname: bucket,
				userId: user_id,
			},
		})

		await prisma.file.create({
			data: {
				filename: `${bucket}:${file_id}`,
				userId: user_id,
				bucketId: bucketRecord?.id!,
			},
		})

		res.status(201).json({ message: 'File successfully created' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error creating file' })
	}
}

export const deleteFile = async (req: Request, res: Response) => {
	const bucket = req.body.bucket
	const file_id = req.params.file_id
	const user_id = req.user.id

	try {
		await s3.deleteObject({ Bucket: bucket, Key: file_id })
		await prisma.file.delete({
			where: {
				filename: `${bucket}:${file_id}`,
				userId: user_id,
			},
		})

		res.status(204).send()
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error deleting file' })
	}
}

export const getFileContent = async (req: Request, res: Response) => {
	const bucket = req.body.bucket
	const file_id = req.params.file_id

	try {
		const response = await s3.getObject({ Bucket: bucket, Key: file_id })
		const content = await response.Body?.transformToString()

		res.status(200).json({ content })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Error retrieving file's content" })
	}
}

export const listFiles = async (req: Request, res: Response) => {
	const { bucket } = req.body
	const user_id = req.user.id

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

		const fileNames = files.map(({ filename }) => filename.split(':')[1])

		res.status(200).json({ files: fileNames })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error retrieving files' })
	}
}

export const createBucket = async (req: Request, res: Response) => {
	const bucket = req.body.bucket
	const user_id = req.user.id

	if (await bucketExists(bucket, user_id)) {
		return res.status(404).json({ message: 'Bucket already exists' })
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
		console.error(error)
		res.status(500).json({ message: 'Error creating bucket' })
	}
}

export const deleteBucket = async (req: Request, res: Response) => {
	const bucket = req.params.bucket_id
	const user_id = req.user.id

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
		console.error(error)
		res.status(500).json({ message: 'Error deleting bucket' })
	}
}
