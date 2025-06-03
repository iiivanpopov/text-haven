import { type PrismaClient, type Settings } from "@prisma";
import SettingsDto from "@entities/settings/model/dto";
import UserDto from "@entities/user/model/dto";
import { Cache } from "@shared/lib/cache";
import { CacheEntity } from "@shared/lib/cache/types";
import ApiError from "@shared/lib/exceptions/ApiError";
import { updateTokens } from "@shared/lib/jwt";
import { resolveUserContext } from "@shared/lib/prisma.ts";

export default class UserService {
  constructor(
    private prisma: PrismaClient,
    private cache: Cache,
  ) {}

  async updateUser(
    uid: string,
    data: { email?: string; password?: string; username?: string },
  ) {
    const userData = await this.prisma.user.findUnique({
      where: { id: uid },
      select: { id: true },
    });

    if (!userData) throw ApiError.NotFound();

    if (data.password) {
      data.password = await Bun.password.hash(data.password);
    }

    const user = await this.prisma.user.update({
      where: { id: uid },
      data,
    });

    await this.cache.flush(CacheEntity.USER, uid);

    return updateTokens(user);
  }

  async fetchUser(userId: string, targetId?: string): Promise<UserDto> {
    const [isOther, effectiveUser] = resolveUserContext(userId, targetId);

    return this.cache.withCache<UserDto>(
      CacheEntity.USER,
      {
        userId: effectiveUser,
        protected: isOther,
      },
      async () => {
        const user = await this.prisma.user.findUnique({
          where: { id: effectiveUser },
        });
        if (!user) throw ApiError.NotFound();

        return new UserDto(
          isOther
            ? user.exposure == "PRIVATE"
              ? { ...user, email: undefined } // foreign private profile
              : user // foreign public profile
            : user, // own profile
        );
      },
    );
  }

  async saveSettings(
    userId: string,
    settings: Partial<Settings>,
  ): Promise<Settings> {
    const settingsDto = new SettingsDto(settings);
    await this.cache.flush(CacheEntity.SETTINGS, userId);
    return this.prisma.settings.upsert({
      where: { userId },
      update: { ...settingsDto },
      create: { userId, ...settingsDto },
    });
  }

  async fetchSettings(userId: string): Promise<Settings> {
    return this.cache.withCache(CacheEntity.SETTINGS, { userId }, async () => {
      const settings = await this.prisma.settings.findUnique({
        where: { userId },
      });
      if (!settings) throw ApiError.BadRequest("Settings not found");
      return settings;
    });
  }
}
