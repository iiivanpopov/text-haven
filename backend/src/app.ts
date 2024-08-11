import { isHttpError } from '@curveball/http-errors'
import { authRoutes, cloudRoutes, linkRoutes } from '@routes'
import { connect, disconnect } from '@services/database'
import '@utils/cleanupTempLinks'
import cors from 'cors'
import dotenv from 'dotenv'
import express, {
	type NextFunction,
	type Request,
	type Response,
} from 'express'

dotenv.config()

if (!process.env.PORT) throw new Error('Missing server port')
const PORT = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use(authRoutes)
app.use(cloudRoutes)
app.use(linkRoutes)

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
	console.error(error)

	res.status(isHttpError(error) ? error.httpStatus : 500).json({
		error: {
			message: error.message || 'Internal Server Error',
		},
	})
})

const start = async () => {
	await connect()
	app.listen(PORT, () => console.log(`Listening ${PORT}`))
}

start()

process.on('SIGINT', async () => {
	await disconnect()
	process.exit(0)
})
