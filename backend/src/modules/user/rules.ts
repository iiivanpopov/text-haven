import { optionalStringField } from "@utils/validators";

export const updateRules = [
  optionalStringField("email", "Email")
    .isEmail()
    .withMessage("Value must be a valid email"),
  optionalStringField("password", "Password"),
  optionalStringField("username", "Username"),
];
