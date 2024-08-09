import { prisma } from '@helpers/database'
import { createJWT } from '@helpers/jwt'
import bcrypt from 'bcryptjs'
import type { Request, Response } from 'express'

export const registration = async (req: Request, res: Response) => {
	const { password, name } = req.body

	const candidate = await prisma.user.findFirst({ where: { user_name: name } })
	if (candidate) return res.status(400).json({ message: 'User already exists' })

	try {
		const hash_password = bcrypt.hashSync(password, 7)
		await prisma.user.create({ data: { user_name: name, password: hash_password } })
		res.status(201).json({ message: 'Successfully created user' })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Failed to create user' })
	}
}

export const login = async (req: Request, res: Response) => {
	const { password, name } = req.body

	const candidate = await prisma.user.findFirst({ where: { user_name: name } })
	if (!candidate) return res.status(400).json({ message: 'User not found' })

	try {
		const validPassword = bcrypt.compareSync(password, candidate.password)
		if (!validPassword) return res.status(400).json({ message: 'Password or login are invalid' })

		const token = createJWT(candidate.id, candidate.user_name)

		res.cookie('token', token, {
			httpOnly: true,
			secure: true,
		})

		res.status(200).json({ message: 'Logged in successfully' })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Failed to log in' })
	}
}
