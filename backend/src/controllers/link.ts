import { decrypt, encrypt } from '@encryption/encryption'
import { bucketExists, objectExists } from '@helpers/cloud'
import { s3 } from '@helpers/s3'
import type { Request, Response } from 'express'

export const generateTempLink = (req: Request, res: Response) => {
	const { bucket, file_id, timestamp } = req.body

	try {
		const link = encrypt(`${bucket}:${file_id}:${timestamp}`)
		res.status(200).json({ link })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Failed to generate temporary link' })
	}
}

export const readTempLink = async (req: Request, res: Response) => {
	const token = req.params.token

	try {
		const [bucket, key, expiration] = decrypt(token).split(':')

		if (parseInt(expiration, 10) < Date.now() / 1000) {
			return res.status(400).json({ message: 'Token expired' })
		}

		if (!(await bucketExists(bucket))) {
			return res.status(404).json({ message: 'Bucket does not exist' })
		}

		if (!(await objectExists(bucket, key))) {
			return res.status(404).json({ message: 'Paste does not exist' })
		}

		const response = await s3.getObject({ Bucket: bucket, Key: key })
		const content = await response.Body?.transformToString()
		res.status(200).json({ content })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error retrieving content' })
	}
}
