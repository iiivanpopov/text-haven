import { stringField } from "@utils/validators";

const emailValidator = () =>
  stringField("email", "Email").isEmail().withMessage("Email is invalid");
const passwordValidator = () => stringField("password", "Password");

export const loginRules = [emailValidator(), passwordValidator()];

export const registerRules = [
  emailValidator(),
  passwordValidator(),
  stringField("username", "Username"),
];
