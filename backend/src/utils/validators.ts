import { body } from 'express-validator'

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

// TODO: ENUM FIELDS
