import { S3 } from '@aws-sdk/client-s3'
import config from '@config'
import ApiError from '@exceptions/ApiError'

class StorageService {
	private s3: S3
	private bucket: string

	constructor() {
		this.s3 = new S3({
			region: config.AWS_REGION,
			credentials: {
				accessKeyId: config.AWS_ACCESS_KEY,
				secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
			},
		})
		this.bucket = config.MAIN_BUCKET
	}

	private async checkFileExistence(name: string): Promise<boolean> {
		try {
			await this.s3.headObject({ Bucket: this.bucket, Key: name })
			return true
		} catch (error) {
			if (error?.$metadata?.httpStatusCode === 404) {
				return false
			}
			throw new Error(`Error checking file existence: ${error.message}`)
		}
	}

	async createFile(name: string, content: string): Promise<void> {
		const exists = await this.checkFileExistence(name)
		if (exists) {
			throw ApiError.BadRequest(`File with name "${name}" already exists.`)
		}

		await this.s3.putObject({
			Bucket: this.bucket,
			Key: name,
			Body: content,
		})
	}

	async updateFile(name: string, content: string): Promise<void> {
		const exists = await this.checkFileExistence(name)
		if (!exists) {
			throw ApiError.BadRequest(`File with name "${name}" does not exist.`)
		}

		await this.s3.putObject({
			Bucket: this.bucket,
			Key: name,
			Body: content,
		})
	}

	async deleteFile(name: string): Promise<void> {
		const exists = await this.checkFileExistence(name)
		if (!exists) {
			throw ApiError.NotFound(`File with name "${name}" not found.`)
		}

		await this.s3.deleteObject({ Bucket: this.bucket, Key: name })
	}

	async deleteFiles(names: string[]): Promise<void> {
		const deleteKeys = names.map(value => ({ Key: value }))
		await this.s3.deleteObjects({
			Bucket: this.bucket,
			Delete: { Objects: deleteKeys },
		})
	}

	async getFileContent(name: string): Promise<string> {
		const exists = await this.checkFileExistence(name)
		if (!exists) {
			throw ApiError.BadRequest(`File with name "${name}" not found.`)
		}

		const response = await this.s3.getObject({ Bucket: this.bucket, Key: name })
		if (!response.Body) {
			throw new Error('Error: File content could not be read.')
		}

		const content = await response.Body.transformToString()
		return content
	}
}

export default StorageService
