import type { Request, Response } from 'express'
import { bucketExists, objectExists } from '../helpers/cloud'
import { s3 } from '../helpers/s3'

export const uploadObject = async (req: Request, res: Response) => {
	const { bucket, key, data } = req.body

	if (!(await bucketExists(bucket)))
		return res.status(400).json({ message: 'Bucket does not exist' })
	if (await objectExists(bucket, key))
		return res.status(400).json({ message: 'Object already exists' })

	try {
		await s3.putObject({ Bucket: bucket, Key: key, Body: data })
		res.status(200).json({ message: 'Object successfully uploaded' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error uploading object' })
	}
}

export const removeObject = async (req: Request, res: Response) => {
	const { bucket, key } = req.body

	if (!(await bucketExists(bucket)))
		return res.status(400).json({ message: 'Bucket does not exist' })
	if (!(await objectExists(bucket, key)))
		return res.status(400).json({ message: 'Object does not exist' })

	try {
		await s3.deleteObject({ Bucket: bucket, Key: key })
		res.status(200).json({ message: 'Object successfully deleted' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error deleting object' })
	}
}

export const getObject = async (req: Request, res: Response) => {
	const { bucket, key } = req.body

	if (!(await bucketExists(bucket)))
		return res.status(400).json({ message: 'Bucket does not exist' })
	if (!(await objectExists(bucket, key)))
		return res.status(400).json({ message: 'Object does not exist' })

	try {
		const response = await s3.getObject({ Bucket: bucket, Key: key })
		const data = await response.Body?.transformToString()
		res.status(200).json({ data, message: 'Object successfully retrieved' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error retrieving object' })
	}
}
export const listObjects = async (req: Request, res: Response) => {
	const { bucket } = req.body

	if (!(await bucketExists(bucket)))
		return res.status(400).json({ message: 'Bucket does not exist' })

	try {
		const response = await s3.listObjectsV2({ Bucket: bucket })
		const objects = response.Contents?.map(obj => obj.Key) || []
		res.status(200).json({ objects, message: 'Objects successfully listed' })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error listing objects' })
	}
}

export const createBucket = async (req: Request, res: Response) => {
	const { bucket } = req.body

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
	const { bucket } = req.body

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
