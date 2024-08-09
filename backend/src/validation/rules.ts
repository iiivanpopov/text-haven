import { body, param } from 'express-validator'

const bucketNameValidation = body('bucket')
	.notEmpty()
	.withMessage("Bucket can't be empty")
	.isString()
	.withMessage('Bucket must be a string')
	.isLength({ min: 3, max: 63 })
	.withMessage('Bucket name must be between 3 and 63 characters long')
	.matches(/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/)
	.withMessage('Bucket name must start and end with a letter or number')
	.matches(/^[^.]{1,}(\.[^.]{1,})*$/)
	.withMessage('Bucket name must not contain two adjacent periods')
	.custom(name => !/^\d+\.\d+\.\d+\.\d+$/.test(name))
	.withMessage('Bucket name must not be formatted as an IP address')
	.custom(name => !name.startsWith('xn--'))
	.withMessage('Bucket name must not start with the prefix xn--')
	.custom(name => !name.startsWith('sthree-'))
	.withMessage('Bucket name must not start with the prefix sthree-')
	.custom(name => !name.startsWith('amzn-s3-demo-'))
	.withMessage('Bucket name must not start with the prefix amzn-s3-demo-')
	.custom(name => !name.endsWith('-s3alias'))
	.withMessage('Bucket name must not end with the suffix -s3alias')
	.custom(name => !name.endsWith('--ol-s3'))
	.withMessage('Bucket name must not end with the suffix --ol-s3')
	.custom(name => !name.endsWith('.mrap'))
	.withMessage('Bucket name must not end with the suffix .mrap')
	.custom(name => !name.endsWith('--x-s3'))
	.withMessage('Bucket name must not end with the suffix --x-s3')

const bodyFileIdValidation = body('file_id')
	.notEmpty()
	.withMessage("File id can't be empty")
	.isString()
	.withMessage('File id must be a string')
	.isLength({ max: 1024 })
	.withMessage("File id can't be longer than 1024 characters")
	.custom(input => input.endsWith('.txt'))
	.withMessage("File id must end with '.txt'")

const paramFileIdValidation = param('file_id')
	.exists()
	.withMessage("file_id can't be empty")
	.isString()
	.withMessage('file_id must be a string')
	.custom(input => input.endsWith('.txt'))
	.withMessage("file_id must end with '.txt'")

export const createFileRules = [
	bucketNameValidation,
	bodyFileIdValidation,
	body('data').notEmpty().withMessage("Data can't be empty"),
]

export const deleteFileRules = [bucketNameValidation, paramFileIdValidation]

export const getFileContentRules = [bucketNameValidation, paramFileIdValidation]

export const listFilesRules = [bucketNameValidation]

export const createBucketRules = [bucketNameValidation]

export const deleteBucketRules = [
	param('bucket_id')
		.exists()
		.withMessage("Bucket can't be empty")
		.isString()
		.withMessage('Bucket must be a string'),
]

export const authRules = [
	body('name')
		.notEmpty()
		.withMessage("Name can't be empty")
		.isString()
		.withMessage('Name must be a string'),
	body('password')
		.notEmpty()
		.withMessage("Password can't be empty")
		.isString()
		.withMessage('Password must be a string'),
]

export const generateTempLinkRules = [
	bucketNameValidation,
	bodyFileIdValidation,
	body('timestamp')
		.notEmpty()
		.withMessage("Timestamp can't be empty")
		.isInt({ min: 0 })
		.withMessage('Timestamp must be a valid Unix timestamp'),
]

export const readTempLinkRules = [param('token').isString().withMessage('Token must be a string')]
