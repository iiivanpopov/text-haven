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
	if (err instanceof ApiError) {
		res.status(err.status).json({ message: err.message, errors: err.errors })
		return
	}
	res.status(500).json({ message: 'Unexpected error' })
}
