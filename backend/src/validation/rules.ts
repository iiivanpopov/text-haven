import { body } from 'express-validator'

// Object rules
export const createObjectRules = [
	body('bucket').notEmpty().withMessage("Bucket can't be empty"),
	body('key')
		.notEmpty()
		.custom(input => input.endsWith('.txt'))
		.withMessage("Invalid Key. Ensure that the key isn't empty and ends with '.txt'"),
	body('data').notEmpty().withMessage("Data can't be empty"),
]

export const deleteObjectRules = [
	body('bucket').notEmpty().withMessage("Bucket can't be empty"),
	body('key')
		.notEmpty()
		.custom(input => input.endsWith('.txt'))
		.withMessage("Invalid Key. Ensure that the key isn't empty and ends with '.txt'"),
]

export const fetchObjectRules = [
	body('bucket').notEmpty().withMessage("Bucket can't be empty"),
	body('key')
		.notEmpty()
		.custom(input => input.endsWith('.txt'))
		.withMessage("Invalid Key. Ensure that the key isn't empty and ends with '.txt'"),
]

export const listObjectsRules = [body('bucket').notEmpty().withMessage("Bucket can't be empty")]

// Bucket rules
export const bucketRules = [body('bucket').notEmpty().withMessage("Bucket can't be empty")]

// Auth rules
export const authRules = [
	body('name').notEmpty().withMessage("Name can't be empty"),
	body('password').notEmpty().withMessage("Password can't be empty"),
]
