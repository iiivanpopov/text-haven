import { S3 } from '@aws-sdk/client-s3'

if (!process.env.AWS_ACCESS_KEY || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION)
	throw new Error('Missing AWS credentials')

export const s3 = new S3({
	region: 'eu-north-1',
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY,
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	},
})
