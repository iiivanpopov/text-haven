import { generateTempLink, listTempLinks, readTempLink } from '@controllers'
import auth from '@middleware/auth'
import { generateTempLinkRules, readTempLinkRules } from '@validation/rules'
import validate from '@validation/validate'
import { Router } from 'express'

const router = Router()

router.post('/tokens', generateTempLinkRules, validate, auth, generateTempLink)
router.get('/:token', readTempLinkRules, validate, readTempLink)
router.get('/', auth, listTempLinks)

export default router
