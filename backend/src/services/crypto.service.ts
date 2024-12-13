export default class Crypto {
	static async hash(password: string) {
		return await Bun.password.hash(password)
	}

	static async verify(password: string, hash_password: string) {
		return await Bun.password.verify(password, hash_password)
	}
}
