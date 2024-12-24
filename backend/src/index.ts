import config from '@config'
import logger from '@utils/logger'
import { prisma } from '@utils/prisma'
import type { Server } from 'http'
import app from './app'

let server: Server

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
