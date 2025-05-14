import {
  enumField,
  optionalStringField,
} from "@shared/lib/validation/validators";

export const updateUserRules = [
  optionalStringField("email", "Email")
    .isEmail()
    .withMessage("Value must be a valid email"),
  optionalStringField("password", "Password"),
  optionalStringField("username", "Username"),
];

export const updateUserSettingsRules = [
  enumField("textCategory", "Text category", ["NOTE", "POST"]),
  enumField("theme", "Theme", ["dark", "light"]),
];
