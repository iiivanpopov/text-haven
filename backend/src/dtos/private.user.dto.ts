import type { Role } from '@prisma'

export default class PrivateUser {
	id: string
	role: Role
	username: Role

	constructor(model: any) {
		this.id = model.id
		this.role = model.role
		this.username = model.username
	}
}
