import { BadRequest, NotFound } from '@curveball/http-errors'
import bcrypt from 'bcryptjs'
import type { NextFunction, Request, Response } from 'express'
import { prisma } from 'services/database'
import { createJWT } from 'services/jwt'
import { isUserInDatabase } from 'utils/existenceCheck'

export const registration = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { password, name } = req.body

	if (await isUserInDatabase(name)) {
		return next(new BadRequest('User already exists'))
	}

	try {
		const hash_password = bcrypt.hashSync(password, 7)
		await prisma.user.create({ data: { name, password: hash_password } })
		res.status(201).json({ message: 'Successfully created user' })
	} catch (error) {
		next(error)
	}
}

export const login = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { password, name } = req.body

	const candidate = await prisma.user.findUnique({ where: { name } })
	if (!candidate) return next(new NotFound('User not found'))

	try {
		const validPassword = bcrypt.compareSync(password, candidate.password)
		if (!validPassword) {
			return next(new BadRequest('Password or login are invalid'))
		}

		const token = createJWT(candidate.id, candidate.name)

		res.status(200).json({ token })
	} catch (error) {
		next(error)
	}
}
