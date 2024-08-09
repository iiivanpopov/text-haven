import { generateTempLink, readTempLink } from '@controllers/link'
import auth from '@middleware/auth'
import { generateTempLinkRules, readTempLinkRules } from '@validation/rules'
import validate from '@validation/validate'
import { Router } from 'express'

const router = Router()

router.post('/tokens', generateTempLinkRules, validate, generateTempLink)
router.get('/:token', readTempLinkRules, validate, readTempLink)

router.use(auth)

export default router
