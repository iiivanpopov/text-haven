import { body, param } from 'express-validator'

// Object rules
export const uploadPasteRules = [
	body('bucket').notEmpty().withMessage("Bucket can't be empty"),
	body('key')
		.notEmpty()
		.custom(input => input.endsWith('.txt'))
		.withMessage("Invalid Key. Ensure that the key isn't empty and ends with '.txt'"),
	body('data').notEmpty().withMessage("Data can't be empty"),
]

export const deletePasteRules = [
	body('bucket').notEmpty().withMessage("Bucket can't be empty"),
	param('key')
		.notEmpty()
		.custom(input => input.endsWith('.txt'))
		.withMessage("Invalid Key. Ensure that the key isn't empty and ends with '.txt'"),
]

export const fetchPasteRules = [
	body('bucket').notEmpty().withMessage("Bucket can't be empty"),
	param('key')
		.notEmpty()
		.custom(input => input.endsWith('.txt'))
		.withMessage("Invalid Key. Ensure that the key isn't empty and ends with '.txt'"),
]

export const listPastesRules = [body('bucket').notEmpty().withMessage("Bucket can't be empty")]

// Bucket rules
export const bucketRules = [body('bucket').notEmpty().withMessage("Bucket can't be empty")]

// Auth rules
export const authRules = [
	body('name').notEmpty().withMessage("Name can't be empty"),
	body('password').notEmpty().withMessage("Password can't be empty"),
]

// Link rules
export const generateTempLinkRules = [
	body('bucket').notEmpty().withMessage("Bucket can't be empty"),
	body('key')
		.notEmpty()
		.custom(input => input.endsWith('.txt'))
		.withMessage("Invalid Key. Ensure that the key isn't empty and ends with '.txt'"),
	body('timestamp').notEmpty().withMessage("Timestamp can't be empty"),
]

export const readTempLinkRules = [
	param('token').notEmpty().withMessage("Invalid token. Ensure that the token isn't empty"),
]
