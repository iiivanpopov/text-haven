import config from '@config'
import JwtService from '@modules/shared/services/jwt.service'
import validate from '@utils/validate'
import { Router } from 'express'
import AuthController from './controller'
import { loginRules, registerRules } from './rules'
import AuthService from './service'

const router = Router()

const jwtService = new JwtService(config.PRISMA, config.JWT_SECRET_KEY, config.REFRESH_SECRET_KEY)
const authService = new AuthService(config.PRISMA, jwtService)
const authController = new AuthController(authService)

router.post('/register', registerRules, validate, authController.register)
router.post('/login', loginRules, validate, authController.login)
router.get('/refresh', authController.refresh)
router.post('/logout', authController.logout)

export default router
