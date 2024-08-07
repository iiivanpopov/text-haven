import { Router } from 'express'
import { login, registration } from '../controllers/authControllers'
import { authRules } from '../validation/rules'

const router = Router()

router.post('/auth/register', authRules, registration)
router.post('/auth/login', authRules, login)

export default router
