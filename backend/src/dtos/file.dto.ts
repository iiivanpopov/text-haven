import { Exposure } from '@prisma/client'

export class FileDto {
	id: string
	name: string
	token: string
	folderId: string
	userId: string
	expiresAt: Date | null
	createdAt: Date
	exposure: Exposure

	constructor(model: any) {
		this.id = model.id
		this.name = model.name
		this.folderId = model.folderId
		this.userId = model.userId
		this.exposure = model.exposure
		this.createdAt = model.createdAt
		this.expiresAt = model.expiresAt ? new Date(model.expiresAt) : null
		this.token = model.token
	}
}
