import { generateTempLink, readTempLink } from '@controllers/link'
import auth from '@middleware/auth'
import { generateTempLinkRules, readTempLinkRules } from '@validation/rules'
import { Router } from 'express'

const router = Router()

router.post('/generate', generateTempLinkRules, generateTempLink)
router.get('/read/:token', readTempLinkRules, readTempLink)

router.use(auth)

export default router
