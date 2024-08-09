import { connect, disconnect } from '@helpers/database'
import authRoutes from '@routes/auth'
import cloudRoutes from '@routes/cloud'
import linkRoutes from '@routes/link'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

if (!process.env.PORT) throw new Error('Missing server port')
const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use(authRoutes)
app.use(cloudRoutes)
app.use(linkRoutes)

const start = async () => {
	await connect()
	app.listen(PORT, () => console.log(`Listening ${PORT}`))
}

start()

process.on('SIGINT', async () => {
	await disconnect()
	process.exit(0)
})
