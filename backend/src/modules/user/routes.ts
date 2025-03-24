import config from '@config'
import auth from '@middleware/auth.middleware'
import JwtService from '@shared/services/jwt.service'
import validate from '@utils/validate'
import { Router } from 'express'
import UserController from './controller'
import { updateRules } from './rules'
import UserService from './service'

const router = Router()

const jwtService = new JwtService(
	config.PRISMA,
	config.JWT_SECRET_KEY,
	config.REFRESH_SECRET_KEY
)
const userService = new UserService(config.PRISMA, jwtService)
const userController = new UserController(userService)

router.patch(
	'/user/update',
	updateRules,
	validate,
	auth,
	userController.updateUser
)

export default router
