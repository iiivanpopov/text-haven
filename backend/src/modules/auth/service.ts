import ApiError from "@exceptions/ApiError";
import type { PrismaClient } from "@prisma";
import { Jwt, TokenType } from "@shared/jwt";

export default class AuthService {
  constructor(
    private prisma: PrismaClient,
    private jwtService: Jwt,
  ) {}

  async registration(email: string, username: string, password: string) {
    const candidate = await this.prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });

    if (candidate) {
      const conflictField = candidate.email == email ? "email" : "username";
      throw ApiError.BadRequest(
        `User with this ${conflictField} already exists.`,
      );
    }

    const hash_password = await Bun.password.hash(password);

    const user = await this.prisma.user.create({
      data: { email, password: hash_password, username },
    });

    return this.jwtService.updateTokens(user);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw ApiError.NotFound("Password or user is incorrect");

    const isPassEquals = await Bun.password.verify(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Password or user is incorrect");
    }

    return this.jwtService.updateTokens(user);
  }

  async logout(refreshToken: string) {
    return await this.jwtService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.Unauthorized();
    }

    const userData = this.jwtService.validateToken(
      refreshToken,
      TokenType.REFRESH,
    );

    if (!(userData && "id" in userData)) {
      throw ApiError.Unauthorized();
    }

    const tokenFromDb = await this.jwtService.findToken(refreshToken);
    if (!tokenFromDb) {
      throw ApiError.Unauthorized();
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userData.id },
    });
    if (!user) {
      throw ApiError.Unauthorized();
    }

    return this.jwtService.updateTokens(user);
  }
}
