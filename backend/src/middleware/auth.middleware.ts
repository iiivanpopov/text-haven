import ApiError from '@exceptions/api-error'
import { TokenService } from '@services'
import type { NextFunction, Request, Response } from 'express'

const tokenService = new TokenService()

export default function (req: Request, res: Response, next: NextFunction) {
	try {
		const authorizationHeader = req.headers.authorization
		if (!authorizationHeader) next(ApiError.Unauthorized())

		const accessToken = authorizationHeader?.split(' ')[1]
		if (!accessToken) next(ApiError.Unauthorized())

		const userData = tokenService.validateAccessToken(accessToken!)
		if (!userData) next(ApiError.Unauthorized())

		req.user = userData
		next()
	} catch (error) {
		next(ApiError.Unauthorized())
	}
}
