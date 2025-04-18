import config from '@config'
import CloudService from '@modules/cloud/service'
import Cache from '@modules/shared/services/cache.service'
import StorageService from '@modules/shared/services/storage.service'

declare var self: Worker // prevent ts errors

const storageService = new StorageService(config.S3)

const cache = new Cache(config.REDIS, config.PRISMA, config.CACHE_EXPIRE_TIME)
const cloudService = new CloudService(storageService, config.PRISMA, cache)

self.onmessage = () => {
	cloudService.clearExpiredFiles().then(() => self.postMessage('Worker: task done.'))
}
