import { generateTempLink, listTempLinks, readTempLink } from '@controllers/link'
import auth from '@middleware/auth'
import { ensureBucketOwnership, ensureFileOwnership } from '@middleware/ownership'
import { generateTempLinkRules, readTempLinkRules } from '@validation/rules'
import validate from '@validation/validate'
import { Router } from 'express'

const router = Router()

router.post(
	'/tokens',
	generateTempLinkRules,
	validate,
	auth,
	ensureBucketOwnership,
	ensureFileOwnership,
	generateTempLink
)
router.get('/:token', readTempLinkRules, validate, readTempLink)
router.get('/', auth, listTempLinks)

export default router
