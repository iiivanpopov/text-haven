import { body } from "express-validator";

export const stringField = (fieldName: string, displayName: string) =>
  body(fieldName)
    .exists()
    .withMessage(`Field ${displayName} is required`)
    .notEmpty()
    .withMessage(`Field ${displayName} can't be empty`)
    .isString()
    .withMessage(`Field ${displayName} must be a string`);

export const optionalStringField = (fieldName: string, displayName: string) =>
  body(fieldName)
    .optional()
    .notEmpty()
    .withMessage(`Field ${displayName} can't be empty`)
    .isString()
    .withMessage(`Field ${displayName} must be a string`);

export const enumField = (
  fieldName: string,
  displayName: string,
  allowedValues: string[],
) =>
  body(fieldName)
    .exists()
    .withMessage(`Field ${displayName} is required`)
    .notEmpty()
    .withMessage(`Field ${displayName} can't be empty`)
    .isIn(allowedValues)
    .withMessage(
      `Field ${displayName} must be one of: ${allowedValues.map((v) => `"${v}"`).join(", ")}`,
    );

export const optionalEnumField = (
  fieldName: string,
  displayName: string,
  allowedValues: string[],
) =>
  body(fieldName)
    .optional()
    .withMessage(`Field ${displayName} is required`)
    .notEmpty()
    .withMessage(`Field ${displayName} can't be empty`)
    .isIn(allowedValues)
    .withMessage(
      `Field ${displayName} must be one of: ${allowedValues.map((v) => `"${v}"`).join(", ")}`,
    );
