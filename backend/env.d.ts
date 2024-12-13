declare namespace NodeJS {
	interface ProcessEnv {
		// AWS
		AWS_ACCESS_KEY: string
		AWS_SECRET_ACCESS_KEY: string
		AWS_REGION: string
		MAIN_BUCKET: string

		// JWT
		JWT_SECRET_KEY: string
		JWT_EXPIRATION_TIME: string
		REFRESH_SECRET_KEY: string
		REFRESH_EXPIRATION_TIME: string

		// Database
		DB_NAME: string
		DB_USERNAME: string
		DB_PASSWORD: string

		DB_HOST: string
		DB_PORT: number
		DATABASE_URL: string

		// Express
		PORT: string

		// Redis
		REDIS_PORT: string
		REDIS_HOST: string
	}
}
