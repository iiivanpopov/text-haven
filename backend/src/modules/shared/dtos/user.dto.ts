import type { Role } from '@prisma'

export default class UserDto {
	email: string
	id: string
	role: Role
	username: Role

	constructor(model: any) {
		this.email = model.email
		this.id = model.id
		this.role = model.role
		this.username = model.username
	}
}
