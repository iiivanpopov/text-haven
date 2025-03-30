import { body } from 'express-validator'
import { optionalStringField, stringField } from '../shared/validators'

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

export const updateFolderRules = [
	optionalStringField('name', 'Name'),
	optionalStringField('parentId', 'Parent id'),
	body('exposure')
		.optional()
		.notEmpty()
		.withMessage("Exposure type can't be empty")
		.isIn(['PRIVATE', 'PUBLIC'])
		.withMessage('Exposure type must be either "PRIVATE" or "PUBLIC"'),
]

export const updateFileRules = [
	optionalStringField('name', 'Name'),
	optionalStringField('folderId', 'Folder id'),
	body('exposure')
		.optional()
		.notEmpty()
		.withMessage("Exposure type can't be empty")
		.isIn(['PRIVATE', 'PUBLIC'])
		.withMessage('Exposure type must be either "PRIVATE" or "PUBLIC"'),
	body('expiresAt').optional().isISO8601().withMessage('Invalid date format'),
]
