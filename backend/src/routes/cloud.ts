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
import { ensureBucketOwnership, ensureFileOwnership } from '@middleware/ownership'
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
router.post('/files', createFileRules, validate, auth, ensureBucketOwnership, createFile)
router.delete(
	'/files/:file_id',
	deleteFileRules,
	validate,
	auth,
	ensureBucketOwnership,
	ensureFileOwnership,
	deleteFile
)
router.get(
	'/files/:file_id',
	getFileContentRules,
	validate,
	auth,
	ensureBucketOwnership,
	ensureFileOwnership,
	getFileContent
)
router.get('/files', listFilesRules, validate, auth, ensureBucketOwnership, listFiles)

// Buckets
router.post('/buckets', createBucketRules, validate, auth, createBucket)
router.delete(
	'/buckets/:bucket_id',
	deleteBucketRules,
	validate,
	auth,
	ensureBucketOwnership,
	deleteBucket
)

export default router
