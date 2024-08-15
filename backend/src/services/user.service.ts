import { UserDto } from '@dtos'
import ApiError from '@exceptions/api-error'
import type { Role } from '@prisma/client'
import { MailService, TokenService } from '@services'
import { prisma } from '@utils'
import { compare, hash } from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

const tokenService = new TokenService()
const mailService = new MailService()

export class UserService {
	async registration(email: string, password: string, role: Role) {
		const candidate = await prisma.user.findFirst({ where: { email } })
		if (candidate) {
			throw ApiError.BadRequest(`User with ${email} already exists`)
		}

		const hash_password = await hash(password, 7)
		const activationLink = uuidv4()
		const user = await prisma.user.create({
			data: { email, password: hash_password, role, activationLink },
		})

		await mailService.sendActivationMail(
			email,
			`${process.env.API_URL}/api/activate/${activationLink}`
		)
		const userDto = new UserDto(user)
		const tokens = await tokenService.generateTokens({ ...userDto })
		await tokenService.saveToken(userDto.id, tokens.refreshToken)
		return {
			...tokens,
			user: { ...userDto },
		}
	}

	async login(email: string, password: string) {
		const user = await prisma.user.findFirst({ where: { email } })
		if (!user) throw ApiError.BadRequest('User not found')

		const isPassEquals = await compare(password, user.password)
		if (!isPassEquals) throw ApiError.BadRequest('Incorrect password')

		const userDto = new UserDto(user)
		const tokens = await tokenService.generateTokens({ ...userDto })

		await tokenService.saveToken(userDto.id, tokens.refreshToken)
		return {
			...tokens,
			user: { ...userDto },
		}
	}

	async logout(refreshToken: string) {
		const token = await tokenService.removeToken(refreshToken)
		return token
	}

	async activate(activationLink: string) {
		const user = await prisma.user.findFirst({ where: { activationLink } })
		if (!user) {
			throw ApiError.BadRequest('Incorrect activation link')
		}
		await prisma.user.update({
			where: { activationLink, email: user.email },
			data: { ...user, isActivated: true },
		})
	}

	async refresh(refreshToken: string) {
		if (!refreshToken) {
			throw ApiError.Unauthorized()
		}
		const userData = tokenService.validateRefreshToken(refreshToken)

		const tokenFromDb = await tokenService.findToken(refreshToken)
		if (!userData || !tokenFromDb || typeof userData != 'object') {
			throw ApiError.Unauthorized()
		}

		const user = await prisma.user.findFirst({ where: { id: userData.id } })
		const userDto = new UserDto(user)
		const tokens = await tokenService.generateTokens({ ...userDto })

		await tokenService.saveToken(userDto.id, tokens.refreshToken)
		return {
			...tokens,
			user: { ...userDto },
		}
	}
}
