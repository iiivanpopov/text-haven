import ApiError from '@exceptions/ApiError'
import JwtService from '@modules/shared/services/jwt.service'
import type { PrismaClient } from '@prisma/client'

export default class UserService {
	constructor(private prisma: PrismaClient, private jwtService: JwtService) {}

	async updateUser(id: string, data: { email?: string; password?: string }) {
		const userData = await this.prisma.user.findUnique({
			where: { email: data.email },
			select: { id: true },
		})

		if (userData && id != userData?.id) throw ApiError.Forbidden()

		if (data.password) {
			data.password = await Bun.password.hash(data.password)
		}

		const user = await this.prisma.user.update({
			where: { id },
			data,
		})

		return await this.jwtService.generateAndSaveTokens(user)
	}
}
