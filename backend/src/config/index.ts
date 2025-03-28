import { S3 } from '@aws-sdk/client-s3'
import { PrismaClient } from '@generated/prisma_client'
import type { PrismaClient as prismaClientType } from '@prisma/client'
import { Time } from '@utils/time'
import { env } from 'bun'
import Redis from 'ioredis'

export default {
	// AWS
	S3: new S3({
		region: env.AWS_REGION || '',
		credentials: {
			accessKeyId: env.AWS_ACCESS_KEY || '',
			secretAccessKey: env.AWS_SECRET_ACCESS_KEY || '',
		},
	}),
	S3_BUCKET: env.S3_BUCKET || '',

	// PRISMA
	PRISMA: new PrismaClient() as prismaClientType,

	// JWT
	JWT_SECRET_KEY: env.JWT_SECRET_KEY || '',
	JWT_EXPIRATION_TIME: Time.mapToMilliseconds(env.JWT_EXPIRATION_TIME || '1d'),
	REFRESH_SECRET_KEY: env.REFRESH_SECRET_KEY || '',
	REFRESH_EXPIRATION_TIME: Time.mapToMilliseconds(env.REFRESH_EXPIRATION_TIME || '30d'),

	// DATABASE
	DATABASE_URL: env.DATABASE_URL || '',

	// HTTP SERVER
	PORT: +env.PORT,

	// REDIS
	CACHE_EXPIRE_TIME: Time.mapToMilliseconds(env.CACHE_EXPIRATION_TIME || '1d') / 1000,
	REDIS: new Redis({
		host: env.REDIS_HOST || 'localhost',
		port: +env.REDIS_PORT || 6379,
	}),
}
