import ApiError from '@exceptions/ApiError'
import UserService from '@modules/user/service'
import type { NextFunction, Request, Response } from 'express'

class UserController {
	constructor(private userService: UserService) {}

	private checkUserPermission(userId: string, id: string) {
		if (userId !== id) {
			throw ApiError.Forbidden()
		}
	}

	updateUser = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.user.id
			const { id, email, password } = req.body

			this.checkUserPermission(userId, id)

			const user = await this.userService.updateUser(id, {
				email,
				password,
			})
			res.status(200).json({ user })
		} catch (error) {
			next(error)
		}
	}
}

export default UserController
