import { decrypt, encrypt } from '@utils'

describe('Encryption and decryption', () => {
	test('Encrypt and decrypt', async () => {
		const data = 'Test data'
		const encrypted = encrypt(data)
		const decrypted = decrypt(encrypted)
		expect(decrypted).toBe(data)
	})
})
