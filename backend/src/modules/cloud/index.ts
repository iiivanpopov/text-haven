import path from 'path'

import logger from '@utils/logger'
export { default } from './routes'

const worker = new Worker(path.join(__dirname, './worker.ts'))

setInterval(() => worker.postMessage('clear'), 1000 * 60)
worker.onmessage = event => {
	logger.log(event.data)
}
