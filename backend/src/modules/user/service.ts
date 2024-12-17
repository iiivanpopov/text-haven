import type { PrismaClient } from '@prisma/client'
import Crypto from '@services/crypto.service'
import JwtService from '@services/jwt.service'
import { prisma } from '@utils/prisma'

class UserService {
	private prisma: PrismaClient

	constructor(private jwtService: JwtService) {
		this.prisma = prisma
	}

	async updateUser(id: string, data: { email?: string; password?: string }) {
		if (data.password) {
			data.password = await Crypto.hash(data.password)
		}

		const user = await this.prisma.user.update({
			where: { id },
			data,
		})

		return await this.jwtService.generateAndSaveTokens(user)
	}
}

export default UserService
