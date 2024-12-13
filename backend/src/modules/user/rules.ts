import { body } from 'express-validator'

const email = body('email')
	.notEmpty()
	.withMessage("Email can't be empty")
	.isString()
	.withMessage('Email must be a string')
	.isEmail()
	.withMessage('Value must be a valid email')

const password = body('password')
	.notEmpty()
	.withMessage("Password can't be empty")
	.isString()
	.withMessage('Password must be a string')

export const updateRules = [password.optional(), email.optional()]
