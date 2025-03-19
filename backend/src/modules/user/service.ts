import ApiError from '@exceptions/ApiError'
import type { PrismaClient } from '@prisma/client'
import JwtService, { jwtService } from '@services/jwt.service'
import { prisma } from '@utils/prisma'

class UserService {
	private prisma: PrismaClient = prisma
	private jwtService: JwtService = jwtService

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

export default UserService
