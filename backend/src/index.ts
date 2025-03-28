import config from '@config'
import logger from '@utils/logger'
import type { Server } from 'http'
import app from './app'

let server: Server

config.PRISMA.$connect().then(() => {
	server = app.listen(config.PORT, () => logger.log(`Listening to port ${config.PORT}.`))
})

const onCloseSignal = () => {
	config.PRISMA.$disconnect().then(() => {
		server.close()
		process.exit()
	})
}

process.on('SIGINT', onCloseSignal)
process.on('SIGTERM', onCloseSignal)
