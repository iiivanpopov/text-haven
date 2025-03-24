import config from '@config'
import ApiError from '@exceptions/ApiError'
import JwtService from '@modules/shared/services/jwt.service'
import type { NextFunction, Request, Response } from 'express'

const jwtService = new JwtService(
	config.PRISMA,
	config.JWT_SECRET_KEY,
	config.REFRESH_SECRET_KEY
)

export default function (req: Request, _res: Response, next: NextFunction) {
	try {
		const authorizationHeader = req.headers.authorization
		if (!authorizationHeader) return next(ApiError.Unauthorized())

		const accessToken = authorizationHeader?.split(' ')[1]
		if (!accessToken) return next(ApiError.Unauthorized())

		const userData = jwtService.validateToken(accessToken, 'access')
		if (!userData) return next(ApiError.Unauthorized())

		req.user = userData
		next()
	} catch (error) {
		console.error(error)
		next(ApiError.Unauthorized())
	}
}
