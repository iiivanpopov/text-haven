import config from '@config'
import UserDto from '@dtos/user.dto'
import ApiError from '@exceptions/ApiError'
import type { PrismaClient, Role, Token, User } from '@prisma/client'
import { Secret, sign, verify } from 'jsonwebtoken'

interface Payload {
	id: string
	email: string
	role: Role
}

interface Tokens {
	accessToken: string
	refreshToken: string
}

export interface ITokenService {
	generateTokens(
		payload: object
	): Promise<{ accessToken: string; refreshToken: string }>
	validateToken(token: string, type: 'refresh' | 'access'): UserDto | null
}

export default class JwtService implements ITokenService {
	constructor(
		private prisma: PrismaClient,
		private accessSecret: string,
		private refreshSecret: string
	) {}

	async generateTokens(payload: Payload): Promise<Tokens> {
		const accessToken = sign(payload, config.JWT_SECRET_KEY, {
			expiresIn: +config.JWT_EXPIRATION_TIME,
		})
		const refreshToken = sign(payload, config.REFRESH_SECRET_KEY as Secret, {
			expiresIn: +config.REFRESH_EXPIRATION_TIME,
		})
		return { accessToken, refreshToken }
	}

	validateToken(token: string, type: 'refresh' | 'access'): UserDto | null {
		try {
			const secretKey =
				type === 'access' ? this.accessSecret : this.refreshSecret
			const decodedToken = verify(token, secretKey) as Payload
			if (
				typeof decodedToken === 'object' &&
				decodedToken !== null &&
				'id' in decodedToken &&
				'email' in decodedToken &&
				'role' in decodedToken
			) {
				return new UserDto(decodedToken as Payload)
			}
			return null
		} catch (error) {
			console.error('Error validating token:', error)
			return null
		}
	}

	async saveToken(userId: string, refreshToken: string): Promise<Token> {
		const tokenData = await this.prisma.token.findFirst({ where: { userId } })

		const updatedTokenData = tokenData
			? await this.updateToken(userId, refreshToken, tokenData)
			: await this.createToken(userId, refreshToken)

		return updatedTokenData
	}

	private async updateToken(
		userId: string,
		refreshToken: string,
		tokenData: Token
	): Promise<Token> {
		return await this.prisma.token.update({
			where: { userId },
			data: { ...tokenData, refreshToken },
		})
	}

	private async createToken(
		userId: string,
		refreshToken: string
	): Promise<Token> {
		return await this.prisma.token.create({
			data: { userId, refreshToken },
		})
	}

	async removeToken(refreshToken: string): Promise<Token> {
		if (!refreshToken) throw ApiError.Unauthorized()
		const tokenData = await this.prisma.token.delete({
			where: { refreshToken },
		})
		return tokenData
	}

	async findToken(refreshToken: string): Promise<Token | null> {
		if (!refreshToken) throw ApiError.Unauthorized()
		const tokenData = await this.prisma.token.findFirst({
			where: { refreshToken },
		})
		return tokenData
	}

	async generateAndSaveTokens(user: User) {
		const userDto = new UserDto(user)
		const tokens = await this.generateTokens({ ...userDto })
		await this.saveToken(userDto.id, tokens.refreshToken)
		return { ...tokens, user: userDto }
	}
}
