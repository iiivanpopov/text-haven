import ApiError from '@exceptions/ApiError'
import PrivateUser from '@modules/shared/dtos/user/private.user.dto'
import PublicUser from '@modules/shared/dtos/user/user.dto'
import Cache from '@modules/shared/services/cache.service'
import JwtService from '@modules/shared/services/jwt.service'
import { Exposure, FileType, type PrismaClient, type Settings } from '@prisma'
import SettingsDto from './dtos/settings.dto'

export default class UserService {
	constructor(private prisma: PrismaClient, private jwtService: JwtService, private cache: Cache) {}

	async updateUser(id: string, data: { email?: string; password?: string; username?: string }) {
		const userData = await this.prisma.user.findUnique({
			where: { id },
			select: { id: true },
		})

		if (!userData) throw ApiError.NotFound()

		if (id != userData.id) throw ApiError.Forbidden() // update only own data

		if (data.password) {
			data.password = await Bun.password.hash(data.password)
		}

		const user = await this.prisma.user.update({
			where: { id },
			data,
		})

		await this.cache.flush('user', id)

		return this.jwtService.generateAndSaveTokens(user)
	}

	async fetchUser(userId: string, targetId?: string): Promise<PrivateUser | PublicUser> {
		const isOtherUser = targetId && userId != targetId
		const effectiveUserId = isOtherUser ? targetId : userId

		const cacheKey = Cache.mapKey('user', { userId: effectiveUserId })
		const cached = await this.cache.get<PrivateUser | PublicUser>(cacheKey)
		if (cached) return isOtherUser ? new PrivateUser(cached) : new PublicUser(cached)

		const user = await this.prisma.user.findUnique({ where: { id: effectiveUserId } })
		if (!user) throw ApiError.NotFound('User not found')

		await this.cache.set(cacheKey, user)

		const userDto =
			user.exposure == Exposure.PUBLIC || userId == targetId
				? new PublicUser(user)
				: new PrivateUser(user)

		return userDto
	}

	async saveSettings(userId: string, settings: { defaultTextType: FileType }): Promise<Settings> {
		const settingsDto = new SettingsDto(settings)
		return await this.prisma.settings.upsert({
			where: { userId },
			update: { ...settingsDto },
			create: { userId, ...settingsDto },
		})
	}

	async fetchSettings(userId: string): Promise<Settings> {
		const cacheKey = Cache.mapKey('settings', { userId })
		const cached = await this.cache.get<Settings>(cacheKey)
		if (cached) return cached

		const settings = await this.prisma.settings.findUnique({ where: { userId } })
		if (!settings) throw ApiError.BadRequest('Settings not found')

		await this.cache.set(cacheKey, settings)

		return settings
	}
}
