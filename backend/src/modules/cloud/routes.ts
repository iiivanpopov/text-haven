import config from '@config'
import auth from '@middleware/auth.middleware'
import cache from '@shared/cache'
import S3 from '@shared/S3'
import validate from '@utils/validate'
import { Router } from 'express'
import CloudController from './controller'
import {
	createFileRules,
	createFolderRules,
	updateFileContentRules,
	updateFileRules,
	updateFolderRules,
} from './rules'
import CloudService from './service'

const router = Router()

const cloudService = new CloudService(S3, config.PRISMA, cache)
const cloudController = new CloudController(cloudService)

// Folders
// Post
router.post('/folders', auth, createFolderRules, validate, cloudController.createFolder)

// Get
router.get('/folders', auth, cloudController.getFolders)

// Patch
router.patch('/folders/:id', auth, updateFolderRules, validate, cloudController.updateFolder)

// Delete
router.delete('/folders/:id', auth, cloudController.deleteFolder)

// Files
// Post
router.post('/files', auth, createFileRules, validate, cloudController.createFile)

// Get
router.get('/files', auth, cloudController.getFilesOrFile)
router.get('/files/:id/content', auth, cloudController.getFileContent)
router.get('/posts', cloudController.getLatestPosts)

// Patch
router.patch('/files/:id', auth, updateFileRules, validate, cloudController.updateFile)
router.patch(
	'/files/:id/content',
	auth,
	updateFileContentRules,
	validate,
	cloudController.updateFileContent
)

// Delete
router.delete('/files/:id', auth, cloudController.deleteFile)

export default router
