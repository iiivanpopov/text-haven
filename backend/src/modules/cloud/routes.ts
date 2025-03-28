import config from '@config'
import auth from '@middleware/auth.middleware'
import Cache from '@modules/shared/services/cache.service'
import StorageService from '@modules/shared/services/storage.service'
import validate from '@utils/validate'
import { Router } from 'express'
import CloudController from './controller'
import { createFileRules, createFolderRules } from './rules'
import CloudService from './service'

const router = Router()

const storageService = new StorageService(config.S3, config.S3_BUCKET)

const cache = new Cache(config.REDIS, config.PRISMA, config.CACHE_EXPIRE_TIME)
const cloudService = new CloudService(storageService, config.PRISMA, cache)
const cloudController = new CloudController(cloudService)

// Folders
// Post
router.post('/folders', auth, createFolderRules, validate, cloudController.createFolder)

// Get
router.get('/folders', auth, cloudController.getFolders)

// Patch
router.patch('/folders/:id', auth, cloudController.updateFolder)

// Delete
router.delete('/folders/:id', auth, cloudController.deleteFolder)

// Files
// Post
router.post('/files', auth, createFileRules, validate, cloudController.createFile)

// Get
router.get('/files', auth, cloudController.getFilesOrFile)
router.get('/files/:id/content', auth, cloudController.getFileContent)

// Patch
router.patch('/files/:id', auth, cloudController.updateFile)
router.patch('/files/:id/content', auth, cloudController.updateFileContent)

// Delete
router.delete('/files/:id', auth, cloudController.deleteFile)

export default router
