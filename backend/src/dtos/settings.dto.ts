import { FileType } from '@prisma'

export default class SettingsDto {
	defaultTextType: FileType

	constructor(model: any) {
		this.defaultTextType = model.defaultTextType
	}
}
