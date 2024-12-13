import ApiError from '@exceptions/ApiError'
import { Role } from '@prisma/client'
import type { NextFunction, Request, Response } from 'express'

export default (...allowedRoles: Role[]) => {
	return (req: Request, _res: Response, next: NextFunction) => {
		if (allowedRoles.includes(req.user.role)) {
			next()
		} else {
			next(ApiError.Forbidden())
		}
	}
}
