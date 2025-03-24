import { emailValidator, passwordValidator } from '../shared/validators'

export const updateRules = [
	passwordValidator().optional(),
	emailValidator().optional(),
]
