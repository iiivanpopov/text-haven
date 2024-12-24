import auth from '@middleware/auth.middleware'
import StorageService from '@services/storage.service'
import validate from '@utils/validate'
import { Router } from 'express'
import CloudController from './controller'
import { createFileRules, createFolderRules } from './rules'
import CloudService from './service'

const router = Router()

const storageService = new StorageService()
const cloudService = new CloudService(storageService)
const cloudController = new CloudController(cloudService)

// Folders
// Post
router.post(
	'/folders',
	auth,
	createFolderRules,
	validate,
	cloudController.createFolder
)

// Get
router.get('/folders/:id', auth, cloudController.getFolder)
router.get('/folders', auth, cloudController.getFolders)

// Patch
router.patch('/folders/:id', auth, cloudController.updateFolder)

// Delete
router.delete('/folders/:id', auth, cloudController.deleteFolder)

// Files
// Post
router.post(
	'/files',
	auth,
	createFileRules,
	validate,
	cloudController.createFile
)

// Get
router.get('/files/:id', auth, cloudController.getFile)
router.get('/files', auth, cloudController.getFiles)
router.get('/files/:id/content', auth, cloudController.getFileContent)

// Patch
router.patch('/files/:id', auth, cloudController.updateFile)
router.patch('/files/:id/content', auth, cloudController.updateFileContent)

// Delete
router.delete('/files/:id', auth, cloudController.deleteFile)

export default router
