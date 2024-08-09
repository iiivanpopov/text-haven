import crypto from 'crypto'

if (!process.env.ALGORITHM) throw new Error('Missing crypto algorithm')

const config = {
	algorithm: process.env.ALGORITHM,
	key: crypto.randomBytes(32),
	iv: crypto.randomBytes(16),
}

export default config
