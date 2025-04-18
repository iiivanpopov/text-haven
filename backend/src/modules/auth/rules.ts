import { emailValidator, passwordValidator, stringField } from '../shared/validators'

export const loginRules = [emailValidator(), passwordValidator()]
export const registerRules = [
	emailValidator(),
	passwordValidator(),
	stringField('username', 'Username'),
]
