import type { Exposure } from '@prisma'

export default class FileDto {
	name: string
	folderId: string
	exposure: Exposure
	expiresAt: Date

	constructor(model: any) {
		this.name = model.name
		this.folderId = model.folderId
		this.exposure = model.exposure
		this.expiresAt = new Date(model.expiresAt)
	}
}
