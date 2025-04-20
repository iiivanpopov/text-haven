import config from '@config'
import CloudService from '@modules/cloud/service'
import Cache from '@shared/cache'
import S3 from '@shared/S3'

declare var self: Worker // prevent ts errors

const cloudService = new CloudService(S3, config.PRISMA, Cache)

self.onmessage = () => {
	cloudService.clearExpiredFiles().then(() => self.postMessage('Worker: task done.'))
}
