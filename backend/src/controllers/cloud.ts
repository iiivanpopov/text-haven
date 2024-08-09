import { bucketExists, objectExists } from '@helpers/cloud'
import { s3 } from '@helpers/s3'
import type { Request, Response } from 'express'

export const uploadPaste = async (req: Request, res: Response) => {
	const { bucket, key, data } = req.body

	if (!(await bucketExists(bucket)))
		return res.status(400).json({ message: 'Bucket does not exist' })
	if (await objectExists(bucket, key))
		return res.status(400).json({ message: 'Paste already exists' })

	try {
		await s3.putObject({
			Bucket: bucket,
			Key: key,
			Body: data,
			ContentType: 'text/plain',
		})

		res.status(200).json({ message: 'Paste successfully uploaded' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error uploading paste' })
	}
}

export const removePaste = async (req: Request, res: Response) => {
	const bucket = req.body.bucket
	const key = req.params.key

	if (!(await bucketExists(bucket)))
		return res.status(400).json({ message: 'Bucket does not exist' })
	if (!(await objectExists(bucket, key)))
		return res.status(400).json({ message: 'Paste does not exist' })

	try {
		await s3.deleteObject({ Bucket: bucket, Key: key })
		res.status(200).json({ message: 'Paste successfully deleted' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error deleting paste' })
	}
}

export const getPasteContent = async (req: Request, res: Response) => {
	const bucket = req.body.bucket
	const key = req.params.key

	if (!(await bucketExists(bucket)))
		return res.status(400).json({ message: 'Bucket does not exist' })
	if (!(await objectExists(bucket, key)))
		return res.status(400).json({ message: 'Paste does not exist' })

	try {
		const response = await s3.getObject({ Bucket: bucket, Key: key })
		const content = await response.Body?.transformToString()
		res.status(200).json({ content })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error retrieving content' })
	}
}

export const listPastes = async (req: Request, res: Response) => {
	const { bucket } = req.body

	if (!(await bucketExists(bucket)))
		return res.status(400).json({ message: 'Bucket does not exist' })

	try {
		const response = await s3.listObjectsV2({ Bucket: bucket })
		const fileNames = response.Contents?.map(obj => obj.Key) || []
		res.status(200).json({ pastes: fileNames })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error listing pastes' })
	}
}

export const createBucket = async (req: Request, res: Response) => {
	const bucket = req.body.bucket

	if (await bucketExists(bucket)) return res.status(400).json({ message: 'Bucket already exists' })

	try {
		await s3.createBucket({ Bucket: bucket })
		res.status(200).json({ message: 'Bucket successfully created' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error creating bucket' })
	}
}

export const deleteBucket = async (req: Request, res: Response) => {
	const bucket = req.body.bucket

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
		res.status(200).json({ message: 'Bucket successfully deleted' })
	} catch (error) {
		if (error.name === 'NoSuchBucket') return res.status(400).json({ message: 'Bucket not found' })

		console.error(error)
		res.status(500).json({ message: 'Error deleting bucket' })
	}
}
