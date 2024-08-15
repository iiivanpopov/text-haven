import type { Exposure } from '@prisma/client'

interface userId {
	userId: string
}

interface AccessBucket extends userId {
	bucketname: string
}

interface AccessFile extends AccessBucket {
	name: string
}

interface CreateFile extends AccessFile {
	content: string
	expiresAt: string
	exposure: Exposure
}

interface DeleteFile extends AccessFile {}
interface GetFile extends AccessFile {}
interface GetFiles extends AccessBucket {}

interface CreateBucket extends AccessBucket {}
interface DeleteBucket extends AccessBucket {}
interface GetBuckets extends userId {}

interface GetFileByToken {
	id: string
	content: string
	name: string
	createdAt: Date
	expiresAt: Date | null
	exposure: Exposure
	token: string
	userId: string
	bucketId: string
}

export class CloudService {
	// private async validateBucketExists(
	// 	bucketname: string,
	// 	userId: string
	// ): Promise<BucketDto> {
	// 	const bucket = await prisma.bucket.findUnique({
	// 		where: { name: bucketname },
	// 		select: { id: true, userId: true, name: true },
	// 	})

	// 	if (!bucket) {
	// 		throw ApiError.NotFound('Bucket does not exist')
	// 	}

	// 	try {
	// 		await s3.headBucket({ Bucket: bucketname })
	// 	} catch (error) {
	// 		if (error.name === 'NotFound') {
	// 			throw ApiError.NotFound('Bucket does not exist')
	// 		} else {
	// 			throw error
	// 		}
	// 	}

	// 	if (bucket.userId !== userId) {
	// 		throw ApiError.Forbidden()
	// 	}

	// 	return new BucketDto(bucket)
	// }

	// private async validateFileExists(
	// 	bucketname: string,
	// 	name: string,
	// 	userId: string
	// ): Promise<FileDto> {
	// 	const file = await prisma.file.findFirst({
	// 		where: { Bucket: { name: bucketname }, name },
	// 	})

	// 	if (!file) {
	// 		throw ApiError.NotFound('File does not exist')
	// 	}

	// 	try {
	// 		await s3.headObject({ Bucket: bucketname, Key: name })
	// 	} catch (error) {
	// 		if (error.name === 'NotFound') {
	// 			throw ApiError.NotFound('File does not exist')
	// 		} else {
	// 			throw error
	// 		}
	// 	}

	// 	if (file.userId !== userId) {
	// 		throw ApiError.Forbidden()
	// 	}

	// 	return new FileDto(file)
	// }

	// async createFile({
	// 	folder,
	// 	name,
	// 	content,
	// 	userId,
	// 	expiresAt,
	// 	exposure,
	// }: CreateFile) {
	// 	const bucketData = await this.validateBucketExists(folder, userId)

	// 	await s3.putObject({
	// 		Bucket: process.env.,
	// 		Key: name,
	// 		Body: content,
	// 	})

	// 	const token = encrypt(`${folder}:${name}`)

	// 	const fileDto = new FileDto({
	// 		name,
	// 		folder,
	// 		userId,
	// 		bucketId: bucketData.id,
	// 		expiresAt,
	// 		token,
	// 		exposure,
	// 	})

	// 	await prisma.file.create({
	// 		data: { ...fileDto },
	// 	})
	// }

	// async deleteFile({ userId, bucketname, name }: DeleteFile) {
	// 	await this.validateBucketExists(bucketname, userId)
	// 	const fileData = await this.validateFileExists(bucketname, name, userId)

	// 	await s3.deleteObject({ Bucket: bucketname, Key: name })

	// 	await prisma.file.delete({
	// 		where: { id: fileData.id },
	// 	})
	// }

	// async getFile({ bucketname, name, userId }: GetFile) {
	// 	await this.validateBucketExists(bucketname, userId)
	// 	const fileData = await this.validateFileExists(bucketname, name, userId)

	// 	const object = await s3.getObject({
	// 		Bucket: bucketname,
	// 		Key: name,
	// 	})

	// 	const contentDto = await FileContentDto.create(object)

	// 	return { ...new FileDto(fileData), ...contentDto }
	// }

	// async getFileByToken(token: string): Promise<GetFileByToken> {
	// 	const file = await prisma.file.findFirst({
	// 		where: { token },
	// 	})
	// 	const fileData = new FileDto(file)

	// 	if (!file) {
	// 		throw ApiError.NotFound('File does not exist')
	// 	}

	// 	if (file.exposure == 'PRIVATE') {
	// 		throw ApiError.BadRequest(
	// 			'You cant get file by token with private exposure'
	// 		)
	// 	}

	// 	const { bucketname, name } = new FileTokenDto(token)

	// 	const object = await s3.getObject({
	// 		Bucket: bucketname,
	// 		Key: name,
	// 	})

	// 	const contentToString = (await object.Body?.transformToString()) || ''

	// 	return { ...fileData, content: contentToString }
	// }

	// async getFiles({ bucketname, userId }: GetFiles) {
	// 	await this.validateBucketExists(bucketname, userId)

	// 	const files = await prisma.file.findMany({
	// 		where: {
	// 			Bucket: {
	// 				name: bucketname,
	// 				userId,
	// 			},
	// 		},
	// 	})

	// 	return files.map(file => new FileDto(file))
	// }

	// async createBucket({ bucketname, userId }: CreateBucket) {
	// 	const bucketExists = await prisma.bucket.findUnique({
	// 		where: { name: bucketname },
	// 	})
	// 	if (bucketExists) {
	// 		throw ApiError.BadRequest('Bucket already exists')
	// 	}

	// 	try {
	// 		await s3.headBucket({ Bucket: bucketname })
	// 		throw ApiError.BadRequest('Bucket already exists')
	// 	} catch (error) {
	// 		if (error.name !== 'NotFound') {
	// 			throw error
	// 		}
	// 	}

	// 	await s3.createBucket({ Bucket: bucketname })
	// 	await prisma.bucket.create({
	// 		data: {
	// 			userId,
	// 			name: bucketname,
	// 		},
	// 	})
	// }

	// async deleteBucket({ bucketname, userId }: DeleteBucket) {
	// 	const bucketData = await this.validateBucketExists(bucketname, userId)

	// 	const objects = await s3.listObjectsV2({ Bucket: bucketname })
	// 	const contents = objects.Contents || []

	// 	if (contents.length > 0) {
	// 		await s3.deleteObjects({
	// 			Bucket: bucketname,
	// 			Delete: {
	// 				Objects: contents.map(({ Key }) => ({ Key })),
	// 			},
	// 		})
	// 	}

	// 	await s3.deleteBucket({ Bucket: bucketname })
	// 	await prisma.bucket.delete({
	// 		where: {
	// 			id: bucketData.id,
	// 		},
	// 	})
	// }

	// async getBuckets({ userId }: GetBuckets) {
	// 	const buckets = await prisma.bucket.findMany({
	// 		where: {
	// 			userId,
	// 		},
	// 	})

	// 	return buckets.map(bucket => new BucketDto(bucket))
	// }
}
