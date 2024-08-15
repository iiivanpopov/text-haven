import { body } from 'express-validator'

export const authRules = [
	body('email')
		.notEmpty()
		.withMessage("Email can't be empty")
		.isString()
		.withMessage('Email must be a string')
		.isEmail()
		.withMessage('Value must be a valid email'),
	body('password')
		.notEmpty()
		.withMessage("Password can't be empty")
		.isString()
		.withMessage('Password must be a string'),
]
