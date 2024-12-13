import ApiError from '@exceptions/ApiError'
import UserService from '@modules/user/service'
import type { NextFunction, Request, Response } from 'express'

class UserController {
	constructor(private userService: UserService) {}

	updateRole = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { role, id } = req.body

			const user = await this.userService.updateRole(id, role)
			res.status(200).json({ user })
		} catch (error) {
			next(error)
		}
	}

	updatePassword = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.user.id
			const { password, id } = req.body

			if (userId != id) {
				throw ApiError.Forbidden()
			}

			const user = await this.userService.updatePassword(id, password)
			res.status(200).json({ user })
		} catch (error) {
			next(error)
		}
	}

	updateEmail = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.user.id
			const { email, id } = req.body

			if (userId != id) {
				throw ApiError.Forbidden()
			}

			const user = await this.userService.updateEmail(id, email)
			res.status(200).json({ user })
		} catch (error) {
			next(error)
		}
	}
}

export default UserController
