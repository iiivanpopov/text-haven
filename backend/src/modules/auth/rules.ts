import { emailValidator, passwordValidator } from '../shared/validators'

export const authRules = [emailValidator(), passwordValidator()]
