import type { PrismaClient, Role } from '@prisma/client'
import Crypto from '@services/crypto.service'
import JwtService from '@services/jwt.service'
import { prisma } from '@utils/prisma'

class UserService {
	private prisma: PrismaClient

	constructor(private jwtService: JwtService) {
		this.prisma = prisma
	}

	async updateRole(id: string, role: Role) {
		const user = await this.prisma.user.update({
			where: { id },
			data: { role },
		})

		return await this.jwtService.generateAndSaveTokens(user)
	}

	async updateEmail(id: string, email: string) {
		const user = await this.prisma.user.update({
			where: { id },
			data: { email },
		})

		return await this.jwtService.generateAndSaveTokens(user)
	}

	async updatePassword(id: string, password: string) {
		const hash_password = await Crypto.hash(password)

		const user = await this.prisma.user.update({
			where: { id },
			data: { password: hash_password },
		})

		return await this.jwtService.generateAndSaveTokens(user)
	}
}

export default UserService
