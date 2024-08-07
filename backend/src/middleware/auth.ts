import type { NextFunction, Request, Response } from 'express'
import { verifyJWT } from '../helpers/jwt'

const auth = (req: Request, res: Response, next: NextFunction) => {
	if (req.method == 'OPTIONS') return next()

	try {
		const token = req.cookies.token
		if (!token) return res.status(403).json({ message: 'Not authenticated' })
		const decoded = verifyJWT(token)
		req.user = decoded
		next()
	} catch (error) {
		console.log(error)
		return res.status(403).json({ message: 'Not authenticated' })
	}
}

export default auth
