import ApiError from '@exceptions/ApiError'
import JwtService, { TokenType } from '@modules/shared/services/jwt.service'
import type { PrismaClient } from '@prisma'

export default class AuthService {
	constructor(private prisma: PrismaClient, private jwtService: JwtService) {}

	async registration(email: string, username: string, password: string) {
		const candidate = await this.prisma.user.findFirst({
			where: {
				OR: [{ email }, { username }],
			},
		})

		if (candidate) {
			const conflictField = candidate.email == email ? 'email' : 'username'
			throw ApiError.BadRequest(`User with this ${conflictField} already exists.`)
		}

		const hash_password = await Bun.password.hash(password)

		const user = await this.prisma.user.create({
			data: { email, password: hash_password, username },
		})

		return this.jwtService.generateAndSaveTokens(user)
	}

	async login(email: string, password: string) {
		const user = await this.prisma.user.findUnique({ where: { email } })
		if (!user) throw ApiError.NotFound('Password or user is incorrect')

		const isPassEquals = await Bun.password.verify(password, user.password)
		if (!isPassEquals) throw ApiError.BadRequest('Password or user is incorrect')

		return this.jwtService.generateAndSaveTokens(user)
	}

	async logout(refreshToken: string) {
		return this.jwtService.removeToken(refreshToken)
	}

	async refresh(refreshToken: string) {
		if (!refreshToken) {
			throw ApiError.Unauthorized()
		}

		const userData = this.jwtService.validateToken(refreshToken, TokenType.REFRESH)

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

		return this.jwtService.generateAndSaveTokens(user)
	}
}
