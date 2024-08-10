import { decrypt, encrypt } from '@encryption/encryption'
import { prisma } from '@helpers/database'
import { temporaryLinkExists } from '@helpers/existenceCheck'
import { s3 } from '@helpers/s3'
import type { Request, Response } from 'express'

export const generateTempLink = async (req: Request, res: Response) => {
	const { bucket, file_id, timestamp } = req.body
	const user_id = req.user.id

	const link = encrypt(`${bucket}:${file_id}:${timestamp}`)

	if (await temporaryLinkExists(link)) {
		return res.status(400).json({ message: 'Link already exists' })
	}

	try {
		await prisma.temporaryLink.create({
			data: {
				link: link!,
				userId: user_id,
				expiration: timestamp,
			},
		})

		res.status(200).json({ link })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Failed to generate temporary link' })
	}
}

export const readTempLink = async (req: Request, res: Response) => {
	const token = req.params.token

	try {
		const [bucket, file_id, expiration] = decrypt(token).split(':')

		if (parseInt(expiration, 10) < Date.now() / 1000) {
			return res.status(400).json({ message: 'Token expired' })
		}

		const response = await s3.getObject({ Bucket: bucket, Key: file_id })
		const content = await response.Body?.transformToString()

		res.status(200).json({ content })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error retrieving content' })
	}
}

export const listTempLinks = async (req: Request, res: Response) => {
	const user_id = req.user.id

	try {
		const response = await prisma.temporaryLink.findMany({
			where: { userId: user_id },
			select: { link: true },
		})
		const links = response.map(({ link }) => link)

		res.status(200).json({ links })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Error retrieving links' })
	}
}
