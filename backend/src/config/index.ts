import { env } from 'bun'
import redis_cfg from './redis'

export default {
	// AWS
	AWS_ACCESS_KEY: env.AWS_ACCESS_KEY || '',
	AWS_SECRET_ACCESS_KEY: env.AWS_SECRET_ACCESS_KEY || '',
	AWS_REGION: env.AWS_REGION || '',
	MAIN_BUCKET: env.MAIN_BUCKET || '',

	// JWT
	JWT_SECRET_KEY: env.JWT_SECRET_KEY || '',
	JWT_EXPIRATION_TIME: env.JWT_EXPIRATION_TIME || '30m',
	REFRESH_SECRET_KEY: env.REFRESH_SECRET_KEY || '',
	REFRESH_EXPIRATION_TIME: env.REFRESH_EXPIRATION_TIME || '30d',

	// Database
	DATABASE_URL: env.DATABASE_URL || '',

	// Express
	PORT: parseInt(env.PORT || '3013', 10),

	...redis_cfg,
}
