import StorageService from '@services/storage.service'
import logger from '@utils/logger'
import { schedule } from 'node-cron'
import CloudService from './service'

const storageService = new StorageService()
const cloudService = new CloudService(storageService)

schedule('* * * * *', async () => {
	try {
		await cloudService.clearExpiredFiles()
	} catch (error) {
		logger.error(error)
	}
})
