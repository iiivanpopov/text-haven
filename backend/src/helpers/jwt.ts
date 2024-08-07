import JWT from 'jsonwebtoken'

if (!process.env.JWT_SECRET_KEY) throw new Error('Missing JWT credentials')

const secret = process.env.JWT_SECRET_KEY

export const createJWT = (id: string | Number, name: string) =>
	JWT.sign({ id, name }, secret, { expiresIn: '24h' })

export const verifyJWT = (jwt: string) => JWT.verify(jwt, secret)
