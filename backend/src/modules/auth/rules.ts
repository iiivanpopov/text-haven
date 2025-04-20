import { stringField } from '@utils/validators'

const emailValidator = () =>
	stringField('email', 'Email').isEmail().withMessage('Value must be a valid email')
const passwordValidator = () => stringField('password', 'Password')

export const loginRules = [emailValidator(), passwordValidator()]

export const registerRules = [
	emailValidator(),
	passwordValidator(),
	stringField('username', 'Username'),
]
