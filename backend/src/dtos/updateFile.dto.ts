import { Exposure } from '@prisma/client'

export default class UpdateFileDto {
	name: string
	folderId: string
	exposure: Exposure
	expiresAt: Date
	createdAt: Date

	constructor(model: any) {
		this.name = model.name
		this.folderId = model.folderId
		this.exposure = model.exposure
		this.expiresAt = model.expiresAt
		this.createdAt = model.createdAt
	}
}
