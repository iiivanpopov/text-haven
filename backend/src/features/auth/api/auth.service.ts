import type { PrismaClient } from "@prisma";
import ApiError from "@shared/lib/exceptions/ApiError";
import { updateTokens, validateRefreshToken } from "@shared/lib/jwt";

export default class AuthService {
  constructor(private prisma: PrismaClient) {}

  async registration(email: string, username: string, password: string) {
    const candidate = await this.prisma.user.findFirst({
      where: {
        email,
        username,
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
      data: {
        email,
        password: hash_password,
        username,
        exposure: "PRIVATE",
        role: "USER",
      },
    });

    await this.prisma.settings.create({
      data: {
        userId: user.id,
        theme: "light",
        textCategory: "NOTE",
      },
    });

    return updateTokens(user);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw ApiError.NotFound("Password or email is incorrect");

    const isPassEquals = await Bun.password.verify(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Password or email is incorrect");
    }

    return updateTokens(user);
  }

  async logout(refreshToken: string) {
    return this.prisma.token.delete({ where: { refreshToken } });
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.Unauthorized();
    }

    const userData = validateRefreshToken(refreshToken);

    if (!(userData && "id" in userData)) {
      throw ApiError.Unauthorized();
    }

    const tokenFromDb = await this.prisma.token.findUnique({
      where: { refreshToken },
    });
    if (!tokenFromDb) {
      throw ApiError.Unauthorized();
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userData.id,
      },
    });
    if (!user) {
      throw ApiError.Unauthorized();
    }

    return updateTokens(user);
  }
}
