import { body } from 'express-validator'

export const emailValidator = () =>
	body('email')
		.notEmpty()
		.withMessage("Email can't be empty")
		.isString()
		.withMessage('Email must be a string')
		.isEmail()
		.withMessage('Value must be a valid email')

export const passwordValidator = () =>
	body('password')
		.notEmpty()
		.withMessage("Password can't be empty")
		.isString()
		.withMessage('Password must be a string')

export const stringField = (fieldName: string, displayName: string) =>
	body(fieldName)
		.exists()
		.withMessage(`${displayName} is required`)
		.notEmpty()
		.withMessage(`${displayName} can't be empty`)
		.isString()
		.withMessage(`${displayName} must be a string`)

export const optionalStringField = (fieldName: string, displayName: string) =>
	body(fieldName)
		.optional()
		.notEmpty()
		.withMessage(`${displayName} can't be empty`)
		.isString()
		.withMessage(`${displayName} must be a string`)
