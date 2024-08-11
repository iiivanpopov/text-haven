import { prisma } from '@services/database'
import { s3 } from '@services/s3'

export const isBucketInDatabase = async (
	bucket: string,
	userId: number
): Promise<boolean> => {
	const existingBucket = await prisma.bucket.findUnique({
		where: { bucketname: bucket, userId },
	})
	return !!existingBucket
}

export const isBucketInS3 = async (bucket: string): Promise<boolean> => {
	try {
		await s3.headBucket({ Bucket: bucket })
		return true
	} catch (error) {
		if (error.name == 'NotFound') {
			return false
		}
		throw new Error(`Error checking bucket in S3: ${error.message}`)
	}
}

export const isFileInDatabase = async (
	filename: string,
	userId: number,
	bucket: string
): Promise<boolean> => {
	const existingFile = await prisma.file.findUnique({
		where: { filename, userId, bucket: { bucketname: bucket } },
	})
	return !!existingFile
}

export const isFileInS3 = async (
	bucketName: string,
	filename: string
): Promise<boolean> => {
	try {
		await s3.headObject({ Bucket: bucketName, Key: filename })
		return true
	} catch (error) {
		if (error.name === 'NotFound') {
			return false
		}
		throw new Error(`Error checking file in S3: ${error.message}`)
	}
}

export const isLinkInDatabase = async (
	link: string,
	userId: number
): Promise<boolean> => {
	const linkRecord = await prisma.temporaryLink.findUnique({
		where: { link, userId },
	})
	return !!linkRecord
}

export const isUserInDatabase = async (name: string): Promise<boolean> => {
	const user = await prisma.user.findUnique({ where: { name } })
	return !!user
}
