import { BadRequest } from '@curveball/http-errors'
import { decrypt, encrypt } from '@services/encryption'
import { s3 } from '@services/s3'
import type { NextFunction, Request, Response } from 'express'
import { prisma } from 'services/database'
import { isLinkInDatabase } from 'utils/existenceCheck'

export const generateTempLink = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { bucket, file_id, timestamp } = req.body
	const user_id = req.user.id

	const link = encrypt(`${bucket}:${file_id}:${timestamp}`)

	if (await isLinkInDatabase(link, user_id)) {
		return next(new BadRequest('Link already exists'))
	}

	try {
		await prisma.temporaryLink.create({
			data: {
				link: link,
				userId: user_id,
				expiration: timestamp,
			},
		})

		res.status(200).json({ link })
	} catch (error) {
		next(error)
	}
}

export const readTempLink = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token = req.params.token

	try {
		const [bucket, file_id, expiration] = decrypt(token).split(':')

		if (parseInt(expiration, 10) < Date.now()) {
			throw new BadRequest('Token expired')
		}

		const response = await s3.getObject({ Bucket: bucket, Key: file_id })
		const content = await response.Body?.transformToString()

		res.status(200).json({ content })
	} catch (error) {
		next(error)
	}
}

export const listTempLinks = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const user_id = req.user.id

	try {
		const response = await prisma.temporaryLink.findMany({
			where: { userId: user_id },
			select: { link: true, expiration: true },
		})
		const links = response.map(({ link, expiration }) => ({
			link,
			expiration: Number(expiration),
		}))

		res.status(200).json({ links })
	} catch (error) {
		next(error)
	}
}
