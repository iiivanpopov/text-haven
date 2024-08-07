import { Router } from 'express'

import {
	createBucket,
	deleteBucket,
	getObject,
	listObjects,
	removeObject,
	uploadObject,
} from '../controllers/cloudControllers'
import auth from '../middleware/auth'
import {
	bucketRules,
	createObjectRules,
	deleteObjectRules,
	fetchObjectRules,
	listObjectsRules,
} from '../validation/rules'

const router = Router()

// Objects
router.post('/cloud', createObjectRules, uploadObject)
router.delete('/cloud', deleteObjectRules, removeObject)
router.get('/cloud', fetchObjectRules, getObject)
router.get('/cloud/all', listObjectsRules, listObjects)

// Buckets
router.post('/cloud/bucket', bucketRules, createBucket)
router.delete('/cloud/bucket', bucketRules, deleteBucket)

router.use(auth)

export default router
