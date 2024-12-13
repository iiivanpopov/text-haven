import auth from '@middleware/auth.middleware'
import authRoles from '@middleware/role.middleware'
import UserService from '@modules/user/service'
import { jwtService } from '@services/jwt.service'
import validate from '@utils/validate'
import { Router } from 'express'
import UserController from './controller'
import { updateRules } from './rules'

const router = Router()

const userService = new UserService(jwtService)
const userController = new UserController(userService)

router.patch('/email', updateRules, validate, auth, userController.updateEmail)
router.patch(
	'/password',
	updateRules,
	validate,
	auth,
	userController.updatePassword
)
router.patch(
	'/role',
	updateRules,
	validate,
	auth,
	authRoles('ADMIN'),
	userController.updateRole
)

export default router
