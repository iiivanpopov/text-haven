import { bucketExists, objectExists } from '@helpers/cloud'
import { s3 } from '@helpers/s3'
import type { Request, Response } from 'express'

export const createFile = async (req: Request, res: Response) => {
	const { bucket, file_id, data } = req.body

	if (!(await bucketExists(bucket))) {
		return res.status(404).json({ message: 'Bucket does not exist' })
	}

	if (await objectExists(bucket, file_id)) {
		return res.status(400).json({ message: 'File already exists' })
	}

	try {
		await s3.putObject({
			Bucket: bucket,
			Key: file_id,
			Body: data,
			ContentType: 'text/plain',
		})

		res.status(201).json({ message: 'File successfully created' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error creating file' })
	}
}

export const deleteFile = async (req: Request, res: Response) => {
	const bucket = req.body.bucket
	const key = req.params.file_id

	if (!(await bucketExists(bucket))) {
		return res.status(404).json({ message: 'Bucket does not exist' })
	}

	if (!(await objectExists(bucket, key))) {
		return res.status(404).json({ message: 'File does not exist' })
	}

	try {
		await s3.deleteObject({ Bucket: bucket, Key: key })

		res.status(204).send()
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error deleting file' })
	}
}

export const getFileContent = async (req: Request, res: Response) => {
	const bucket = req.body.bucket
	const key = req.params.file_id

	if (!(await bucketExists(bucket))) {
		return res.status(404).json({ message: 'Bucket does not exist' })
	}

	if (!(await objectExists(bucket, key))) {
		return res.status(404).json({ message: 'File does not exist' })
	}

	try {
		const response = await s3.getObject({ Bucket: bucket, Key: key })
		const content = await response.Body?.transformToString()

		res.status(200).json({ content })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: "Error retrieving file's content" })
	}
}

export const listFiles = async (req: Request, res: Response) => {
	const { bucket } = req.body

	if (!(await bucketExists(bucket))) {
		return res.status(404).json({ message: 'Bucket does not exist' })
	}

	try {
		const response = await s3.listObjectsV2({ Bucket: bucket })
		const fileNames = response.Contents?.map(obj => obj.Key) || []

		res.status(200).json({ files: fileNames })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error retrieving files' })
	}
}

export const createBucket = async (req: Request, res: Response) => {
	const bucket = req.body.bucket

	if (await bucketExists(bucket)) {
		return res.status(400).json({ message: 'Bucket already exists' })
	}

	try {
		await s3.createBucket({ Bucket: bucket })

		res.status(201).json({ message: 'Bucket successfully created' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error creating bucket' })
	}
}

export const deleteBucket = async (req: Request, res: Response) => {
	const bucket = req.params.bucket_id

	if (!(await bucketExists(bucket))) {
		return res.status(404).json({ message: 'Bucket does not exist' })
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

		res.status(204).send()
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error deleting bucket' })
	}
}
