declare namespace NodeJS {
	interface ProcessEnv {
		// AWS
		AWS_ACCESS_KEY: string
		AWS_SECRET_ACCESS_KEY: string
		AWS_REGION: string
		S3_BUCKET: string

		// JWT
		JWT_SECRET_KEY: string
		JWT_EXPIRATION_TIME: TimeType
		REFRESH_SECRET_KEY: string
		REFRESH_EXPIRATION_TIME: TimeType

		// DATABASE
		DB_NAME: string
		DB_USERNAME: string
		DB_PASSWORD: string
		DB_HOST: string
		DB_PORT: number
		DATABASE_URL: string

		// EXPRESS
		PORT: string

		// REDIS
		REDIS_PORT: string
		REDIS_HOST: string
		REDIS_URL: string
		CACHE_EXPIRATION_TIME: TimeType
	}
}
