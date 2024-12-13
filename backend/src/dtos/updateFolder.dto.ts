export default class UpdateFolderDto {
	name: string
	parentId: string | null
	createdAt: Date

	constructor(model: any) {
		this.name = model.name
		this.parentId = model.parentId
		this.createdAt = model.createdAt
	}
}
