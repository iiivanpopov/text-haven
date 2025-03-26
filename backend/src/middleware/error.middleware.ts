import ApiError from '@exceptions/ApiError'
import logger from '@utils/logger'
import type { NextFunction, Request, Response } from 'express'

export default function (
	err: Error,
	_req: Request,
	res: Response,
	_next: NextFunction
) {
	logger.error(err)

	const isProduction = process.env.NODE_ENV === 'production'
	const status = err instanceof ApiError ? err.status : 500
	const message =
		isProduction && status === 500 ? 'Internal Server Error' : err.message
	const errors = err instanceof ApiError ? err.errors : undefined

	res.status(status).json({ message, errors })
}
