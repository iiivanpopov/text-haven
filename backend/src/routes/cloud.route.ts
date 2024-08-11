import { Router } from 'express'

import {
	createBucket,
	createFile,
	deleteBucket,
	deleteFile,
	getFileContent,
	listFiles,
} from '@controllers'
import auth from '@middleware/auth'
import {
	createBucketRules,
	createFileRules,
	deleteBucketRules,
	deleteFileRules,
	getFileRules,
	listFilesRules,
} from '@validation/rules'
import validate from '@validation/validate'

const router = Router()

router.post('/files', createFileRules, validate, auth, createFile)
router.delete('/files/:file_id', deleteFileRules, validate, auth, deleteFile)
router.get('/files/:file_id', getFileRules, validate, auth, getFileContent)
router.get('/files', listFilesRules, validate, auth, listFiles)

router.post('/buckets', createBucketRules, validate, auth, createBucket)
router.delete(
	'/buckets/:bucket_id',
	deleteBucketRules,
	validate,
	auth,
	deleteBucket
)

export default router
