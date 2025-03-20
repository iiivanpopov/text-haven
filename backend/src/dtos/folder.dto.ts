import type { Exposure } from '@generated/prisma_client'

export default class FolderDto {
	name: string
	parentId: string | null
	exposure: Exposure

	constructor(model: any) {
		this.name = model.name
		this.exposure = model.exposure
		this.parentId = model.parentId
	}
}
