import config from '@config'
import UserDto from '@dtos/user.dto'
import ApiError from '@exceptions/ApiError'
import type { Role, Token, User } from '@prisma/client'
import logger from '@utils/logger'
import { prisma } from '@utils/prisma'
import { sign, verify } from 'jsonwebtoken'

interface Payload {
	id: string
	email: string
	role: Role
}

interface Tokens {
	accessToken: string
	refreshToken: string
}

export default class JwtService {
	async generateTokens(payload: Payload): Promise<Tokens> {
		const accessToken = sign(payload, config.JWT_SECRET_KEY, {
			expiresIn: config.JWT_EXPIRATION_TIME,
		})
		const refreshToken = sign(payload, config.REFRESH_SECRET_KEY, {
			expiresIn: config.REFRESH_EXPIRATION_TIME,
		})
		return { accessToken, refreshToken }
	}

	validateAccessToken(token: string): UserDto | null {
		try {
			const userData = verify(token, config.JWT_SECRET_KEY) as UserDto
			return userData
		} catch (error) {
			logger.error(error)
			return null
		}
	}

	validateRefreshToken(token: string): UserDto | null {
		try {
			const userData = verify(token, config.REFRESH_SECRET_KEY) as UserDto
			return userData
		} catch (error) {
			logger.error(error)
			return null
		}
	}

	async saveToken(userId: string, refreshToken: string): Promise<Token> {
		const tokenData = await prisma.token.findFirst({ where: { userId } })
		if (tokenData) {
			return await prisma.token.update({
				where: { userId },
				data: { ...tokenData, refreshToken },
			})
		}
		const token = await prisma.token.create({
			data: { userId, refreshToken },
		})
		return token
	}

	async removeToken(refreshToken: string): Promise<Token> {
		if (!refreshToken) throw ApiError.Unauthorized()
		const tokenData = await prisma.token.delete({
			where: { refreshToken },
		})
		return tokenData
	}

	async findToken(refreshToken: string): Promise<Token | null> {
		if (!refreshToken) throw ApiError.Unauthorized()
		const tokenData = await prisma.token.findFirst({
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

export const jwtService = new JwtService()
