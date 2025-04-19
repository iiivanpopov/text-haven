import ApiError from '@exceptions/ApiError'
import { S3Client } from 'bun'

class StorageService {
	constructor(private s3: S3Client) {}

	async writeFile(name: string, content: string): Promise<number> {
		return await this.s3.write(name, content)
	}

	async deleteFile(name: string): Promise<void> {
		const fileExistance = await this.s3.exists(name)
		if (!fileExistance) {
			throw ApiError.BadRequest(`File ${name} does not exist`)
		}
		await this.s3.delete(name)
	}

	async deleteFiles(names: string[]): Promise<void> {
		const promises: Promise<void>[] = names.map(name => this.deleteFile(name))
		await Promise.allSettled(promises)
	}

	async getFileContent(name: string): Promise<string> {
		const fileExistance = await this.s3.exists(name)
		if (!fileExistance) {
			throw ApiError.BadRequest(`File ${name} does not exist`)
		}
		return await this.s3.file(name).text()
	}
}

export default StorageService
