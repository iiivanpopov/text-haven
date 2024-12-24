import { body } from 'express-validator'

export const createFileRules = [
	body('folderId')
		.exists()
		.withMessage('Folder id is required')
		.notEmpty()
		.withMessage("Folder id can't be empty"),
	body('name')
		.exists()
		.withMessage('Name is required')
		.notEmpty()
		.withMessage("Name can't be empty")
		.isString()
		.withMessage('Name must be a string'),
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
	body('name')
		.exists()
		.withMessage('Name is required')
		.notEmpty()
		.withMessage("Name can't be empty")
		.isString()
		.withMessage('Name must be a string'),
	body('exposure')
		.exists()
		.withMessage('Exposure type is required')
		.notEmpty()
		.withMessage("Exposure type can't be empty")
		.isIn(['PRIVATE', 'PUBLIC'])
		.withMessage('Exposure type must be either "PRIVATE" or "PUBLIC"'),
	body('parentId')
		.optional()
		.notEmpty()
		.withMessage("Parent id can't be empty")
		.isString()
		.withMessage('Parent id must be a string'),
]
