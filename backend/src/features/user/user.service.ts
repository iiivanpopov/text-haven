import { type PrismaClient, type Settings, TextCategory, User } from "@prisma";
import SettingsDto from "@entities/settings/model/dto";
import UserDto from "@entities/user/model/dto";
import { Cache } from "@shared/lib/cache";
import ApiError from "@shared/lib/exceptions/ApiError";
import { updateTokens } from "@shared/lib/jwt";

export default class UserService {
  constructor(
    private prisma: PrismaClient,
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

    return updateTokens(user);
  }

  async fetchUser(userId: string, targetId?: string): Promise<UserDto> {
    const isOtherUser = targetId && userId !== targetId;
    const effectiveUserId = isOtherUser ? targetId : userId;

    const cacheKey = Cache.mapKey("user", { userId: effectiveUserId });

    if (cacheKey) {
      const cached = await this.cache.get<User>(cacheKey);
      if (cached) {
        const userInstance =
          isOtherUser && cached.exposure !== "PUBLIC"
            ? new UserDto({ ...cached, email: "" })
            : new UserDto(cached);

        return { ...userInstance };
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
        ? new UserDto({ ...user, email: "" })
        : new UserDto(user);

    return { ...userInstance };
  }

  async saveSettings(
    userId: string,
    settings: { defaultTextType: TextCategory },
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
