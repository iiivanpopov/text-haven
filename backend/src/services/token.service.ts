import ApiError from '@exceptions/api-error'
import type { Role } from '@prisma/client'
import { prisma } from '@utils'
import jwt from 'jsonwebtoken'

interface Payload {
	id: string
	email: string
	role: Role
}

export class TokenService {
	async generateTokens(payload: Payload) {
		const accessToken = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
			expiresIn: process.env.JWT_EXPIRATION_TIME,
		})
		const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET_KEY, {
			expiresIn: '30d',
		})
		return { accessToken, refreshToken }
	}

	validateAccessToken(token: string) {
		try {
			const userData = jwt.verify(token, process.env.JWT_SECRET_KEY)
			return userData
		} catch (error) {
			return null
		}
	}

	validateRefreshToken(token: string) {
		try {
			const userData = jwt.verify(token, process.env.REFRESH_SECRET_KEY)
			return userData
		} catch (error) {
			return null
		}
	}

	async saveToken(userId: string, refreshToken: string) {
		const tokenData = await prisma.token.findFirst({ where: { userId } })
		if (tokenData) {
			return await prisma.token.update({
				where: { userId },
				data: { ...tokenData, refreshToken },
			})
		}
		const token = await prisma.token.create({ data: { userId, refreshToken } })
		return token
	}

	async removeToken(refreshToken: string) {
		if (!refreshToken) throw ApiError.Unauthorized()
		const tokenData = await prisma.token.delete({ where: { refreshToken } })
		return tokenData
	}

	async findToken(refreshToken: string) {
		if (!refreshToken) throw ApiError.Unauthorized()
		const tokenData = await prisma.token.findFirst({ where: { refreshToken } })
		return tokenData
	}
}
