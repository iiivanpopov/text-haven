import config from '@config'
import logger from '@utils/logger'
import { prisma } from '@utils/prisma'
import type { IncomingMessage, Server, ServerResponse } from 'http'
import app from './app'

let server: Server<typeof IncomingMessage, typeof ServerResponse>

prisma.$connect().then(() => {
	server = app.listen(config.PORT, () =>
		logger.log(`Listening to port ${config.PORT}.`)
	)
})

const onCloseSignal = () => {
	prisma.$disconnect().then(() => {
		server.close()
		process.exit()
	})
}

process.on('SIGINT', onCloseSignal)
process.on('SIGTERM', onCloseSignal)
