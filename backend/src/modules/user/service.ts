import ApiError from '@exceptions/ApiError'
import PrivateUser from '@modules/shared/dtos/user/private.user.dto'
import PublicUser from '@modules/shared/dtos/user/user.dto'
import JwtService from '@modules/shared/services/jwt.service'
import { Exposure, type PrismaClient } from '@prisma'

export default class UserService {
	constructor(private prisma: PrismaClient, private jwtService: JwtService) {}

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

		return this.jwtService.generateAndSaveTokens(user)
	}

	async fetchUser(userId: string, targetId: string): Promise<PrivateUser | PublicUser> {
		const user = await this.prisma.user.findUnique({ where: { id: targetId } })
		if (!user) throw ApiError.NotFound('User not found')
		return user.exposure == Exposure.PUBLIC || userId == targetId
			? new PublicUser(user)
			: new PrivateUser(user)
	}
}
