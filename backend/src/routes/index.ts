import { CloudController, UserController } from '@controllers'
import { authRules } from '@validation/rules'
import validate from '@validation/validate'
import { Router } from 'express'

const userController = new UserController()
const cloudController = new CloudController()

const router = Router()

router.post('/register', authRules, validate, userController.register)
router.post('/login', authRules, validate, userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)
router.get('/activate/:link', userController.activate)

// router.post(
// 	'/files',
// 	createFileRules,
// 	validate,
// 	authMiddleware,
// 	cloudController.createFile
// )
// router.delete(
// 	'/files/:name',
// 	accessFile,
// 	validate,
// 	authMiddleware,
// 	cloudController.deleteFile
// )
// router.get(
// 	'/files/:name',
// 	accessFile,
// 	validate,
// 	authMiddleware,
// 	cloudController.getFile
// )
// router.get(
// 	'/files/token/:token',
// 	authMiddleware,
// 	cloudController.getFileByToken
// )
// router.get(
// 	'/files',
// 	accessBucket,
// 	validate,
// 	authMiddleware,
// 	cloudController.getFiles
// )

// router.post(
// 	'/buckets',
// 	accessBucket,
// 	validate,
// 	authMiddleware,
// 	cloudController.createBucket
// )
// router.delete('/buckets/:bucket', authMiddleware, cloudController.deleteBucket)
// router.get('/buckets', authMiddleware, cloudController.getBuckets)

export default router
