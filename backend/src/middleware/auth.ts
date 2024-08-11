import { verifyJWT } from '@services/jwt'
import type { NextFunction, Request, Response } from 'express'

const auth = (req: Request, res: Response, next: NextFunction) => {
	if (req.method == 'OPTIONS') return next()

	try {
		const token = req.headers.authorization?.split(' ')[1]
		if (!token) return res.status(401).json({ message: 'Not authenticated' })
		const decoded = verifyJWT(token)
		req.user = decoded
		next()
	} catch (error) {
		console.log(error)
		return res.status(401).json({ message: 'Not authenticated' })
	}
}

export default auth
