import config from '@config'
import jwt from '@shared/jwt'
import validate from '@utils/validate'
import { Router } from 'express'
import AuthController from './controller'
import { loginRules, registerRules } from './rules'
import AuthService from './service'

const router = Router()

const authService = new AuthService(config.PRISMA, jwt)
const authController = new AuthController(authService)

router.post('/register', registerRules, validate, authController.register)
router.post('/login', loginRules, validate, authController.login)
router.get('/refresh', authController.refresh)
router.post('/logout', authController.logout)

export default router
