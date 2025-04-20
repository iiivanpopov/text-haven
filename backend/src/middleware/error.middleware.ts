import ApiError from '@exceptions/ApiError'
import logger from '@utils/logger'
import { NextFunction, Request, Response } from 'express'

export default (err: Error | ApiError, req: Request, res: Response, next: NextFunction) => {
	const statusCode = err instanceof ApiError ? err.status : 500
	const message =
		process.env.NODE_ENV === 'production' && statusCode === 500
			? 'Internal Server Error'
			: err.message
	const errors = err instanceof ApiError ? err.errors : undefined

	logger.error({
		message: err.message,
		stack: err.stack,
		statusCode,
	})

	res.status(statusCode).json({
		status: 'error',
		message,
		errors,
	})
}
