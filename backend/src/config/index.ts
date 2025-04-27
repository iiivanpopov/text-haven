import { PrismaClient } from "@prisma";
import { Time } from "@utils/time";
import { env, RedisClient, S3Client } from "bun";

export default {
  // AWS
  S3: new S3Client({
    region: env.AWS_REGION || "",
    accessKeyId: env.AWS_ACCESS_KEY || "",
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY || "",
    bucket: env.S3_BUCKET || "",
  }),

  // PRISMA
  PRISMA: new PrismaClient(),

  // JWT
  JWT_SECRET_KEY: env.JWT_SECRET_KEY || "",
  JWT_EXPIRATION_TIME: Time.mapToMilliseconds(env.JWT_EXPIRATION_TIME || "1d"),
  REFRESH_SECRET_KEY: env.REFRESH_SECRET_KEY || "",
  REFRESH_EXPIRATION_TIME: Time.mapToMilliseconds(
    env.REFRESH_EXPIRATION_TIME || "30d",
  ),

  // DATABASE
  DATABASE_URL: env.DATABASE_URL || "",

  // HTTP SERVER
  PORT: +env.PORT,

  // REDIS
  CACHE_EXPIRE_TIME: Time.mapToMilliseconds(env.CACHE_EXPIRATION_TIME || "1d"),
  REDIS: new RedisClient(),
};
