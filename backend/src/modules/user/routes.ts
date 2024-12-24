import auth from '@middleware/auth.middleware'
import UserService from '@modules/user/service'
import validate from '@utils/validate'
import { Router } from 'express'
import UserController from './controller'
import { updateRules } from './rules'

const router = Router()

const userService = new UserService()
const userController = new UserController(userService)

router.patch(
	'/user/update',
	updateRules,
	validate,
	auth,
	userController.updateUser
)

export default router
