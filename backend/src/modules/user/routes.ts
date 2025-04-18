import config from '@config'
import auth from '@middleware/auth.middleware'
import Cache from '@modules/shared/services/cache.service'
import JwtService from '@shared/services/jwt.service'
import validate from '@utils/validate'
import { Router } from 'express'
import UserController from './controller'
import { updateRules } from './rules'
import UserService from './service'

const router = Router()

const jwtService = new JwtService(config.PRISMA, config.JWT_SECRET_KEY, config.REFRESH_SECRET_KEY)
const cache = new Cache(config.REDIS, config.PRISMA, config.CACHE_EXPIRE_TIME)
const userService = new UserService(config.PRISMA, jwtService, cache)
const userController = new UserController(userService)

router.patch('/user', updateRules, validate, auth, userController.updateUser)
router.patch('/user/settings', auth, userController.saveSettings)
router.get('/user/settings', auth, userController.fetchSettings)

router.get('/user/:id', auth, userController.fetchUser)

export default router
