import { env } from "bun";
import type { StringValue } from "ms";

function getEnvVar(
  key: string,
  required = true,
  defaultValue?: string,
): string {
  const value = env[key];
  if (required && (value === undefined || value === "")) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value ?? defaultValue ?? "";
}

export default {
  // AWS
  BUCKET: getEnvVar("S3_BUCKET"),
  ACCESS_KEY_ID: getEnvVar("AWS_ACCESS_KEY"),
  SECRET_ACCESS_KEY: getEnvVar("AWS_SECRET_ACCESS_KEY"),

  // JWT
  JWT_SECRET_KEY: getEnvVar("JWT_SECRET_KEY"),
  JWT_EXPIRATION_TIME: getEnvVar(
    "JWT_EXPIRATION_TIME",
    false,
    "1d",
  ) as StringValue,
  REFRESH_SECRET_KEY: getEnvVar("REFRESH_SECRET_KEY"),
  REFRESH_EXPIRATION_TIME: getEnvVar(
    "REFRESH_EXPIRATION_TIME",
    false,
    "30d",
  ) as StringValue,

  // DATABASE
  DATABASE_URL: getEnvVar("DATABASE_URL"),

  // HTTP SERVER
  PORT: (() => {
    const port = Number(env.PORT);
    if (isNaN(port))
      throw new Error("Invalid or missing PORT environment variable");
    return port;
  })(),

  // REDIS
  CACHE_EXPIRE_TIME: (() => {
    const val = env.CACHE_EXPIRE_TIME ?? "86400"; // default to 24h (seconds)
    const num = Number(val);
    if (isNaN(num) || num <= 0) {
      throw new Error("Invalid CACHE_EXPIRE_TIME environment variable");
    }
    return num;
  })(),
};
