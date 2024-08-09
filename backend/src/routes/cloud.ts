import { Router } from 'express'

import {
	createBucket,
	deleteBucket,
	getPasteContent,
	listPastes,
	removePaste,
	uploadPaste,
} from '@controllers/cloud'
import auth from '@middleware/auth'
import {
	bucketRules,
	deletePasteRules,
	fetchPasteRules,
	listPastesRules,
	uploadPasteRules,
} from '@validation/rules'

const router = Router()

// Objects
router.post('/upload', uploadPasteRules, uploadPaste)
router.delete('/files/:key', deletePasteRules, removePaste)
router.get('/files/:token', fetchPasteRules, getPasteContent)
router.get('/files', listPastesRules, listPastes)

// Buckets
router.post('/bucket', bucketRules, createBucket)
router.delete('/bucket', bucketRules, deleteBucket)

router.use(auth)

export default router
