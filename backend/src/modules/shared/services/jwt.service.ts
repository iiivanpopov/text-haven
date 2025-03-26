import config from '@config'
import ApiError from '@exceptions/ApiError'
import UserDto from '@modules/shared/dtos/user.dto'
import type { PrismaClient, Role, Token, User } from '@prisma/client'
import logger from '@utils/logger'
import { sign, verify } from 'jsonwebtoken'

export enum TokenType {
	ACCESS,
	REFRESH,
}

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
	generateTokens(payload: object): Promise<Tokens>
	validateToken(token: string, tokenType: TokenType): UserDto | null
}

export default class JwtService implements ITokenService {
	constructor(
		private prisma: PrismaClient,
		private accessSecret: string,
		private refreshSecret: string
	) {}

	async generateTokens(payload: Payload): Promise<Tokens> {
		const accessToken = sign(payload, this.accessSecret, {
			expiresIn: +config.JWT_EXPIRATION_TIME,
		})
		const refreshToken = sign(payload, this.refreshSecret, {
			expiresIn: +config.REFRESH_EXPIRATION_TIME,
		})
		return { accessToken, refreshToken }
	}

	validateToken(token: string, tokenType: TokenType): UserDto | null {
		try {
			const secretKey = tokenType == TokenType.ACCESS ? this.accessSecret : this.refreshSecret
			const decodedToken = verify(token, secretKey)

			return new UserDto(decodedToken)
		} catch (error) {
			logger.error(error)
			return null
		}
	}

	async saveToken(userId: string, refreshToken: string): Promise<Token> {
		const updatedTokenData = await this.setToken(userId, refreshToken)

		return updatedTokenData
	}

	private async setToken(userId: string, refreshToken: string): Promise<Token> {
		return this.prisma.token.upsert({
			where: { userId },
			update: { refreshToken },
			create: { userId, refreshToken },
		})
	}

	async removeToken(refreshToken: string): Promise<Token> {
		if (!refreshToken) throw ApiError.Unauthorized('Refresh token is required')
		const tokenData = await this.prisma.token.delete({
			where: { refreshToken },
		})
		return tokenData
	}

	async findToken(refreshToken: string): Promise<Token | null> {
		if (!refreshToken) throw ApiError.Unauthorized('Refresh token is required')
		const tokenData = await this.prisma.token.findUnique({
			where: { refreshToken },
		})
		return tokenData
	}

	async generateAndSaveTokens(user: User) {
		const userDto = new UserDto(user)
		const tokens = await this.generateTokens(userDto)
		await this.saveToken(userDto.id, tokens.refreshToken)
		return { ...tokens, user: userDto }
	}
}
