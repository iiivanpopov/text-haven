declare var self: Worker // prevent ts errors

import CloudService from '@modules/cloud/service'
import Cache from '@modules/shared/services/cache.service'
import StorageService from '@modules/shared/services/storage.service'

import config from '@config'

const storageService = new StorageService(config.S3, config.S3_BUCKET)

const cache = new Cache(config.REDIS, config.PRISMA, config.CACHE_EXPIRE_TIME)
const cloudService = new CloudService(storageService, config.PRISMA, cache)

self.onmessage = () => {
	cloudService
		.clearExpiredFiles()
		.then(() => self.postMessage('Worker: clear done.'))
}
