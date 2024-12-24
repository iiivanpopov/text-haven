import ApiError from '@exceptions/ApiError'
import type { PrismaClient } from '@prisma/client'
import Crypto from '@services/crypto.service'
import JwtService from '@services/jwt.service'
import { prisma } from '@utils/prisma'

class AuthService {
	private prisma: PrismaClient = prisma

	constructor(private jwtService: JwtService) {}

	async registration(email: string, password: string) {
		const candidate = await this.prisma.user.findUnique({ where: { email } })
		if (candidate) {
			throw ApiError.BadRequest(`User with ${email} already exists`)
		}

		const hash_password = await Crypto.hash(password)
		const user = await this.prisma.user.create({
			data: { email, password: hash_password },
		})

		return await this.jwtService.generateAndSaveTokens(user)
	}

	async login(email: string, password: string) {
		const user = await this.prisma.user.findUnique({ where: { email } })
		if (!user) throw ApiError.NotFound('Password or user is incorrect')

		const isPassEquals = await Crypto.verify(password, user.password)
		if (!isPassEquals)
			throw ApiError.BadRequest('Password or user is incorrect')

		return await this.jwtService.generateAndSaveTokens(user)
	}

	async logout(refreshToken: string) {
		const token = await this.jwtService.removeToken(refreshToken)
		return token
	}

	async refresh(refreshToken: string) {
		if (!refreshToken) {
			throw ApiError.Unauthorized()
		}

		const userData = this.jwtService.validateRefreshToken(refreshToken)

		if (!userData || !Object.hasOwn(userData, 'id')) {
			throw ApiError.Unauthorized()
		}

		const tokenFromDb = await this.jwtService.findToken(refreshToken)
		if (!tokenFromDb) {
			throw ApiError.Unauthorized()
		}

		const user = await this.prisma.user.findUnique({
			where: { id: userData.id },
		})
		if (!user) {
			throw ApiError.Unauthorized()
		}

		return await this.jwtService.generateAndSaveTokens(user)
	}
}

export default AuthService
