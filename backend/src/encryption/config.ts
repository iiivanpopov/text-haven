if (!process.env.ALGORITHM || !process.env.ENCRYPTION_KEY || !process.env.IV)
	throw new Error('Missing crypto variables')

const config = {
	algorithm: process.env.ALGORITHM,
	key: Buffer.from(process.env.ENCRYPTION_KEY, 'hex'),
	iv: Buffer.from(process.env.IV, 'hex'),
}

export default config
