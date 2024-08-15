import errorMiddleware from '@middleware/error.middleware'
import router from '@routes'
import { connect, disconnect } from '@utils'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
// app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }))

app.use('/api', router)

app.use(errorMiddleware)

const start = async () => {
	if (process.env.NODE_ENV != 'test') {
		await connect()
		app.listen(PORT, () => console.log(`Listening ${PORT}`))
	}
}

start()

process.on('SIGINT', async () => {
	await disconnect()
	process.exit(0)
})

export default app
