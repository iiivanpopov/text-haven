import crypto from 'crypto'
import config from './config'

const { algorithm, key, iv } = config

export const encrypt = (data: string) => {
	const cipher = crypto.createCipheriv(algorithm, key, iv)
	let encrypted = cipher.update(data, 'utf8', 'hex')
	encrypted += cipher.final('hex')
	return encrypted
}

export const decrypt = (encryptedData: string) => {
	const decipher = crypto.createDecipheriv(algorithm, key, iv)
	let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
	decrypted += decipher.final('utf8')
	return decrypted
}
