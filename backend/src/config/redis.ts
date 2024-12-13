import { env } from 'bun'

export default {
	REDIS_PORT: parseInt(env.REDIS_PORT || '6379', 10),
	REDIS_HOST: env.REDIS_HOST,
	CACHE_EXPIRE_TIME: 60 * 60 * 24,
}
