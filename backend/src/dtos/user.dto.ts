import type { Role } from '@prisma/client'

export default class UserDto {
	email: string
	id: string
	role: Role

	constructor(model: any) {
		this.email = model.email
		this.id = model.id
		this.role = model.role
	}
}
