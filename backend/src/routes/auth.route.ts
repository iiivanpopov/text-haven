import { login, registration } from '@controllers'
import { authRules } from '@validation/rules'
import validate from '@validation/validate'
import { Router } from 'express'

const router = Router()

router.post('/register', authRules, validate, registration)
router.post('/login', authRules, validate, login)

export default router
