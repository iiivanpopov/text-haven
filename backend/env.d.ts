declare namespace NodeJS {
	interface ProcessEnv {
		// AWS
		AWS_ACCESS_KEY: string
		AWS_SECRET_ACCESS_KEY: string
		AWS_REGION: string
		MAIN_BUCKET: string

		// AUTH
		JWT_SECRET_KEY: string
		JWT_EXPIRATION_TIME: string

		REFRESH_SECRET_KEY: string
		REFRESH_EXPIRATION_TIME: string

		// MAIL SERVICE
		SMTP_HOST: string
		SMTP_PORT: number
		SMTP_USER: string
		SMTP_PASSWORD: string

		API_URL: string
		CLIENT_URL: string

		// DATABASE
		DATABASE_URL: string
		DATABASE_URL_TEST: string

		// EXPRESS
		PORT: string | number // Server port

		// CRYPTO
		ALGORITHM: crypto.CipherGCMTypes
		ENCRYPTION_KEY: string
		IV: string // Initializing vector
	}
}
