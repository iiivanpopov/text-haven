import { FileType } from '@generated/prisma_client'

export default class SettingsDto {
	defaultTextType: FileType

	constructor(model: any) {
		this.defaultTextType = model.defaultTextType
	}
}
