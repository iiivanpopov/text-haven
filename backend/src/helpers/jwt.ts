import JWT from 'jsonwebtoken'

if (!process.env.JWT_SECRET_KEY || !process.env.JWT_EXPIRATION_TIME)
	throw new Error('Missing JWT credentials')

const secret = process.env.JWT_SECRET_KEY

export const createJWT = (id: string | Number, name: string) =>
	JWT.sign({ id, name }, secret, { expiresIn: process.env.JWT_EXPIRATION_TIME })

export const verifyJWT = (jwt: string) => JWT.verify(jwt, secret)
