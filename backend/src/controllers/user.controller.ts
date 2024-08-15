import { UserService } from '@services'
import type { NextFunction, Request, Response } from 'express'
const userService = new UserService()

export class UserController {
	async register(req: Request, res: Response, next: NextFunction) {
		try {
			const { password, email, role } = req.body
			const userData = await userService.registration(email, password, role)
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
			return res.status(200).json(userData)
		} catch (error) {
			next(error)
		}
	}

	async login(req: Request, res: Response, next: NextFunction) {
		try {
			const { email, password } = req.body
			const userData = await userService.login(email, password)
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
			return res.status(200).json(userData)
		} catch (error) {
			next(error)
		}
	}

	async logout(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies
			await userService.logout(refreshToken)
			res.clearCookie('refreshToken')
			res.status(200).send()
		} catch (error) {
			next(error)
		}
	}

	async activate(req: Request, res: Response, next: NextFunction) {
		try {
			const activationLink = req.params.link
			await userService.activate(activationLink)
			return res.redirect(process.env.CLIENT_URL)
		} catch (error) {
			next(error)
		}
	}

	async refresh(req: Request, res: Response, next: NextFunction) {
		try {
			const { refreshToken } = req.cookies
			const userData = await userService.refresh(refreshToken)
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: 30 * 24 * 60 * 60 * 1000,
				httpOnly: true,
			})
			return res.status(200).json(userData)
		} catch (error) {
			next(error)
		}
	}
}
