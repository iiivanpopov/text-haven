import PrivateUser from './private.user.dto'

export default class PublicUser extends PrivateUser {
	email: string

	constructor(model: any) {
		super(model)
		this.email = model.email
	}
}
