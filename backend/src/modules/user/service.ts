import ApiError from '@exceptions/ApiError'
import JwtService from '@modules/shared/services/jwt.service'
import type { PrismaClient } from '@prisma/client'

export default class UserService {
	constructor(private prisma: PrismaClient, private jwtService: JwtService) {}

	async updateUser(id: string, data: { email?: string; password?: string }) {
		const userData = await this.prisma.user.findUnique({
			where: { id },
			select: { id: true },
		})

		if (!userData) throw ApiError.NotFound() // user not found

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
}
