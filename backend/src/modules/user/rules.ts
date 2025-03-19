import { body } from 'express-validator'

const emailValidator = () =>
	body('email')
		.notEmpty()
		.withMessage("Email can't be empty")
		.isString()
		.withMessage('Email must be a string')
		.isEmail()
		.withMessage('Value must be a valid email')

const passwordValidator = () =>
	body('password')
		.notEmpty()
		.withMessage("Password can't be empty")
		.isString()
		.withMessage('Password must be a string')

export const updateRules = [
	passwordValidator().optional(),
	emailValidator().optional(),
]
