import { jwtService } from '@services/jwt.service'
import validate from '@utils/validate'
import { Router } from 'express'
import AuthController from './controller'
import { authRules } from './rules'
import AuthService from './service'

const router = Router()

const authService = new AuthService(jwtService)
const authController = new AuthController(authService)

router.post('/register', authRules, validate, authController.register)
router.post('/login', authRules, validate, authController.login)
router.get('/refresh', authController.refresh)
router.post('/logout', authController.logout)

export default router
