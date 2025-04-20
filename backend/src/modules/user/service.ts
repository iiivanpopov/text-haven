import ApiError from "@exceptions/ApiError";

import PrivateUser from "@dtos/private.user.dto";
import User from "@dtos/public.user.dto";
import { FileType, type PrismaClient, type Settings } from "@prisma";
import { Cache } from "@shared/cache";
import { Jwt } from "@shared/jwt";
import SettingsDto from "../../dtos/settings.dto";

export default class UserService {
  constructor(
    private prisma: PrismaClient,
    private jwtService: Jwt,
    private cache: Cache,
  ) {}

  async updateUser(
    id: string,
    data: { email?: string; password?: string; username?: string },
  ) {
    const userData = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!userData) throw ApiError.NotFound();

    if (id != userData.id) throw ApiError.Forbidden(); // update only own data

    if (data.password) {
      data.password = await Bun.password.hash(data.password);
    }

    const user = await this.prisma.user.update({
      where: { id },
      data,
    });

    await this.cache.flush("user", id);

    return this.jwtService.updateTokens(user);
  }

  async fetchUser(
    userId: string,
    targetId?: string,
  ): Promise<(PrivateUser | User) & { canEdit: boolean }> {
    const isOtherUser = targetId && userId !== targetId;
    const effectiveUserId = isOtherUser ? targetId : userId;

    const cacheKey = Cache.mapKey("user", { userId: effectiveUserId });

    if (cacheKey) {
      const cached = await this.cache.get<PrivateUser | User>(cacheKey);
      if (cached) {
        const userInstance =
          isOtherUser && cached.exposure !== "PUBLIC"
            ? new PrivateUser(cached)
            : new User(cached);

        return { ...userInstance, canEdit: !isOtherUser };
      }
    }

    const user = await this.prisma.user.findUnique({
      where: { id: effectiveUserId },
    });

    if (!user) {
      throw ApiError.NotFound("User not found");
    }

    if (cacheKey) {
      await this.cache.set(cacheKey, user);
    }

    const userInstance =
      isOtherUser && user.exposure !== "PUBLIC"
        ? new PrivateUser(user)
        : new User(user);

    return { ...userInstance, canEdit: !isOtherUser };
  }

  async saveSettings(
    userId: string,
    settings: { defaultTextType: FileType },
  ): Promise<Settings> {
    const settingsDto = new SettingsDto(settings);
    await this.cache.flush("settings", userId);
    return this.prisma.settings.upsert({
      where: { userId },
      update: { ...settingsDto },
      create: { userId, ...settingsDto },
    });
  }

  async fetchSettings(userId: string): Promise<Settings> {
    const cacheKey = Cache.mapKey("settings", { userId });
    if (cacheKey) {
      const cached = await this.cache.get<Settings>(cacheKey);
      if (cached) return cached;
    }
    const settings = await this.prisma.settings.findUnique({
      where: { userId },
    });
    if (!settings) throw ApiError.BadRequest("Settings not found");

    if (cacheKey) await this.cache.set(cacheKey, settings);

    return settings;
  }
}
