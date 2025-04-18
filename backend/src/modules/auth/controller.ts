import type { NextFunction, Request, Response } from 'express'
import type AuthService from './service'

export default class AuthController {
	constructor(private authService: AuthService) {}

	register = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { password, email, username } = req.body

			const userData = await this.authService.registration(email, username, password)

			res.cookie('refreshToken', userData.refreshToken, {
				// maxAge: 30 * 24 * 60 * 60 * 1000,
				expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			})
			res.status(200).json(userData)
		} catch (error) {
			next(error)
		}
	}

	login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { email, password } = req.body
			const userData = await this.authService.login(email, password)
			res.cookie('refreshToken', userData.refreshToken, {
				expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),

				httpOnly: true,
			})
			res.status(200).json(userData)
		} catch (error) {
			next(error)
		}
	}

	logout = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { refreshToken } = req.cookies
			await this.authService.logout(refreshToken)
			res.clearCookie('refreshToken')
			res.status(200).end()
		} catch (error) {
			next(error)
		}
	}

	refresh = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { refreshToken } = req.cookies
			const userData = await this.authService.refresh(refreshToken)
			res.cookie('refreshToken', userData.refreshToken, {
				expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
				httpOnly: true,
			})
			res.status(200).json(userData)
		} catch (error) {
			next(error)
		}
	}
}
