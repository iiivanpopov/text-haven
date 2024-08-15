export class FileContentDto {
	content: string

	private constructor(content: string) {
		this.content = content
	}

	static async create(model: any): Promise<FileContentDto> {
		const content = (await model.Body?.transformToString()) || ''
		return new FileContentDto(content)
	}
}
