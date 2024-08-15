import { decrypt } from '@utils'

export class FileTokenDto {
	folder: string
	name: string

	constructor(token: string) {
		const [folder, name] = decrypt(token).split(':')
		this.folder = folder
		this.name = name
	}
}
