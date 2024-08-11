import crypto from 'crypto'

if (!process.env.ALGORITHM || !process.env.ENCRYPTION_KEY || !process.env.IV)
	throw new Error('Missing crypto variables')

const algorithm = process.env.ALGORITHM
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex')
const iv = Buffer.from(process.env.IV, 'hex')

export const encrypt = (data: string): string => {
	const cipher = crypto.createCipheriv(algorithm, key, iv)
	let encrypted = cipher.update(data, 'utf8', 'hex')
	encrypted += cipher.final('hex')
	return encrypted
}

export const decrypt = (encryptedData: string): string => {
	const decipher = crypto.createDecipheriv(algorithm, key, iv)
	let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
	decrypted += decipher.final('utf8')
	return decrypted
}
