import type { User } from "@prisma";
import { type JwtPayload, sign, verify } from "jsonwebtoken";
import UserDto from "@entities/user/model/dto";
import config from "@shared/config";
import type { Payload, Tokens } from "@shared/lib/jwt/types";
import logger from "@shared/lib/logger";
import prisma from "@shared/lib/prisma";

function validateToken(token: string, secretKey: string): UserDto | null {
  try {
    const decoded = verify(token, secretKey) as JwtPayload;
    return new UserDto(decoded);
  } catch (error) {
    logger.error(error, "Token validation failed");
    return null;
  }
}

export function generateTokens(payload: Payload): Tokens {
  const accessToken = sign(payload, config.JWT_SECRET_KEY, {
    expiresIn: config.JWT_EXPIRATION_TIME,
  });
  const refreshToken = sign(payload, config.REFRESH_SECRET_KEY, {
    expiresIn: config.REFRESH_EXPIRATION_TIME,
  });
  return { accessToken, refreshToken };
}

export function validateAccessToken(token: string): UserDto | null {
  return validateToken(token, config.JWT_SECRET_KEY);
}

export function validateRefreshToken(token: string): UserDto | null {
  return validateToken(token, config.REFRESH_SECRET_KEY);
}

export async function updateTokens(
  user: User,
): Promise<{ accessToken: string; refreshToken: string; user: UserDto }> {
  const userDto = new UserDto(user);
  const tokens = generateTokens({ ...userDto });

  await prisma.token.upsert({
    where: { userId: userDto.id },
    create: { userId: userDto.id, refreshToken: tokens.refreshToken },
    update: { refreshToken: tokens.refreshToken },
  });

  return { ...tokens, user: userDto };
}
