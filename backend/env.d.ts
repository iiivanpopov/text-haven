declare namespace NodeJS {
	interface ProcessEnv {
		// AWS
		AWS_ACCESS_KEY: string
		AWS_SECRET_ACCESS_KEY: string
		AWS_REGION: string

		// JWT
		JWT_SECRET_KEY: string
		JWT_EXPIRATION_TIME: string

		// DATABASE
		DATABASE_URL: string

		// EXPRESS
		PORT: string | number // Server port

		// CRYPTO
		ALGORITHM: crypto.CipherGCMTypes
		ENCRYPTION_KEY: string
		IV: string // Initializing vector
	}
}
