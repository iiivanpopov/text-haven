export default class FolderDto {
	name: string
	parentId: string | null

	constructor(model: any) {
		this.name = model.name
		this.parentId = model.parentId
	}
}
