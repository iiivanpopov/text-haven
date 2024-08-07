import { s3 } from './s3'

export const bucketExists = async (bucket: string): Promise<boolean> => {
	try {
		await s3.headBucket({ Bucket: bucket })
		return true
	} catch (error) {
		if (error.name === 'NotFound') return false
		throw error
	}
}

export const objectExists = async (bucket: string, key: string): Promise<boolean> => {
	try {
		await s3.headObject({ Bucket: bucket, Key: key })
		return true
	} catch (error) {
		if (error.name === 'NotFound') return false
		throw error
	}
}
