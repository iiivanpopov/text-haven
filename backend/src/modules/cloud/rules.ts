import { body } from 'express-validator'

const stringField = (fieldName: string, displayName: string) =>
	body(fieldName)
		.exists()
		.withMessage(`${displayName} is required`)
		.notEmpty()
		.withMessage(`${displayName} can't be empty`)
		.isString()
		.withMessage(`${displayName} must be a string`)

const optionalStringField = (fieldName: string, displayName: string) =>
	body(fieldName)
		.optional()
		.notEmpty()
		.withMessage(`${displayName} can't be empty`)
		.isString()
		.withMessage(`${displayName} must be a string`)

export const createFileRules = [
	stringField('folderId', 'Folder id'),
	stringField('name', 'Name'),
	body('content')
		.exists()
		.withMessage('Content is required')
		.isString()
		.withMessage('Content must be a string'),
	body('exposure')
		.exists()
		.withMessage('Exposure type is required')
		.notEmpty()
		.withMessage("Exposure type can't be empty")
		.isIn(['PRIVATE', 'PUBLIC'])
		.withMessage('Exposure type must be either "PRIVATE" or "PUBLIC"'),
	body('expiresAt').optional().isISO8601().withMessage('Invalid date format'),
]

export const createFolderRules = [
	stringField('name', 'Name'),
	body('exposure')
		.exists()
		.withMessage('Exposure type is required')
		.notEmpty()
		.withMessage("Exposure type can't be empty")
		.isIn(['PRIVATE', 'PUBLIC'])
		.withMessage('Exposure type must be either "PRIVATE" or "PUBLIC"'),
	optionalStringField('parentId', 'Parent id'),
]
