import { prisma } from './database'

export const bucketExists = async (bucket: string, user_id: number): Promise<boolean> => {
	const existingBucket = await prisma.bucket.findFirst({
		where: {
			bucketname: bucket,
			userId: user_id,
		},
	})
	return !!existingBucket
}

export const objectExists = async (
	bucket: string,
	file_id: string,
	user_id: number
): Promise<boolean> => {
	const existingFile = await prisma.file.findFirst({
		where: {
			filename: `${bucket}:${file_id}`,
			userId: user_id,
			bucket: {
				bucketname: bucket,
				userId: user_id,
			},
		},
	})
	return !!existingFile
}

export const temporaryLinkExists = async (link: string) => {
	const existingLink = await prisma.temporaryLink.findFirst({
		where: {
			link,
		},
	})
	return !!existingLink
}
