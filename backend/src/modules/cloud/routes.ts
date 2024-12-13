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

router.post(
	'/files',
	auth,
	createFileRules,
	validate,
	cloudController.createFile
)
router.patch('/files/:id', auth, cloudController.updateFile)
router.get('/files/:id', auth, cloudController.getFile)
router.get('/files', auth, cloudController.getFiles)
router.get('/files/:id/content', auth, cloudController.getFileContent)
router.patch('/files/:id/content', auth, cloudController.updateFileContent)
router.delete('/files/:id', auth, cloudController.deleteFile)

router.post(
	'/folders',
	auth,
	createFolderRules,
	validate,
	cloudController.createFolder
)
router.patch('/folders/:id', auth, cloudController.updateFolder)
router.get('/folders', auth, cloudController.getFolders)
router.get('/folders/:id', auth, cloudController.getFolder)
router.delete('/folders/:id', auth, cloudController.deleteFolder)

export default router
