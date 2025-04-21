import config from "@config";
import UserDto from "@dtos/public.user.dto";
import ApiError from "@exceptions/ApiError";
import type { PrismaClient, Token, User } from "@prisma";
import logger from "@utils/logger";
import { JwtPayload, sign, verify } from "jsonwebtoken";
import { type Payload, type Tokens, TokenType } from "./types";

export class Jwt {
  constructor(
    private prisma: PrismaClient,
    private accessSecret: string,
    private refreshSecret: string,
  ) {}

  private generateTokens(payload: Payload): Tokens {
    const accessToken = sign(payload, this.accessSecret, {
      expiresIn: config.JWT_EXPIRATION_TIME,
    });
    const refreshToken = sign(payload, this.refreshSecret, {
      expiresIn: config.REFRESH_EXPIRATION_TIME,
    });
    return { accessToken, refreshToken };
  }

  validateToken(token: string, tokenType: TokenType): UserDto | null {
    try {
      const secret =
        tokenType == TokenType.ACCESS ? this.accessSecret : this.refreshSecret;
      const decoded = verify(token, secret) as JwtPayload;
      return new UserDto(decoded);
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  private async upsertRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<Token> {
    return this.prisma.token.upsert({
      where: { userId },
      update: { refreshToken },
      create: { userId, refreshToken },
    });
  }

  async removeToken(refreshToken: string): Promise<Token> {
    if (!refreshToken) throw ApiError.Unauthorized("Missing refresh token");
    return this.prisma.token.delete({ where: { refreshToken } });
  }

  async findToken(refreshToken: string): Promise<Token | null> {
    if (!refreshToken) throw ApiError.Unauthorized("Missing refresh token");
    return this.prisma.token.findUnique({ where: { refreshToken } });
  }

  async updateTokens(user: User) {
    const userDto = new UserDto(user);
    const tokens = this.generateTokens({ ...userDto });
    await this.upsertRefreshToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
}

export default new Jwt(
  config.PRISMA,
  config.JWT_SECRET_KEY,
  config.REFRESH_SECRET_KEY,
);
