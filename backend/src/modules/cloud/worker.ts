declare var self: Worker // prevent ts errors

import StorageService from '@services/storage.service'
import CloudService from './service'

const storageService = new StorageService()
const cloudService = new CloudService(storageService)

self.onmessage = () => {
	cloudService
		.clearExpiredFiles()
		.then(() => self.postMessage('Worker: clear done.'))
}
