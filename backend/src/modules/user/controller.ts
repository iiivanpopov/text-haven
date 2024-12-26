import UserService from '@modules/user/service'
import type { NextFunction, Request, Response } from 'express'

class UserController {
	constructor(private userService: UserService) {}

	updateUser = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userId = req.user.id
			const { email, password } = req.body

			const user = await this.userService.updateUser(userId, {
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
