import { Router } from 'express'

import {
	createBucket,
	createFile,
	deleteBucket,
	deleteFile,
	getFileContent,
	listFiles,
} from '@controllers/cloud'
import auth from '@middleware/auth'
import {
	createBucketRules,
	createFileRules,
	deleteBucketRules,
	deleteFileRules,
	getFileContentRules,
	listFilesRules,
} from '@validation/rules'
import validate from '@validation/validate'

const router = Router()

// Objects
router.post('/files', createFileRules, validate, createFile)
router.delete('/files/:file_id', deleteFileRules, validate, deleteFile)
router.get('/files/:file_id', getFileContentRules, validate, getFileContent)
router.get('/files', listFilesRules, validate, listFiles)

// Buckets
router.post('/buckets', createBucketRules, validate, createBucket)
router.delete('/buckets/:bucket_id', deleteBucketRules, validate, deleteBucket)

router.use(auth)

export default router
