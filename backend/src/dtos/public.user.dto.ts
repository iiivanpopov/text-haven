import PrivateUser from "./private.user.dto";

export default class User extends PrivateUser {
  email: string;

  constructor(model: any) {
    super(model);
    this.email = model.email;
  }
}
