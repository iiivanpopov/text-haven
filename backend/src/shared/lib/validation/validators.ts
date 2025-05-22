import { body } from "express-validator";

const cannotBeEmptyMsg = (displayName: string) =>
  `Field ${displayName} can't be empty`;

const isRequiredMsg = (displayName: string) =>
  `Field ${displayName} is required`;

const mustBeStringMsg = (displayName: string) =>
  `Field ${displayName} must be a string`;

const mustBeOneOfMsg = (displayName: string, allowedValues: string[]) =>
  `Field ${displayName} must be one of: ${allowedValues.map((v) => `"${v}"`).join(", ")}`;

export const stringField = (fieldName: string, displayName: string) =>
  body(fieldName)
    .exists()
    .withMessage(isRequiredMsg(displayName))
    .bail()
    .notEmpty()
    .withMessage(cannotBeEmptyMsg(displayName))
    .bail()
    .isString()
    .withMessage(mustBeStringMsg(displayName))
    .bail()
    .trim();

export const optionalStringField = (fieldName: string, displayName: string) =>
  body(fieldName)
    .optional()
    .notEmpty()
    .withMessage(cannotBeEmptyMsg(displayName))
    .bail()
    .isString()
    .withMessage(mustBeStringMsg(displayName))
    .bail()
    .trim();

export const enumField = (
  fieldName: string,
  displayName: string,
  allowedValues: string[],
) =>
  body(fieldName)
    .exists()
    .withMessage(isRequiredMsg(displayName))
    .bail()
    .notEmpty()
    .withMessage(cannotBeEmptyMsg(displayName))
    .bail()
    .isString()
    .withMessage(mustBeStringMsg(displayName))
    .bail()
    .isIn(allowedValues)
    .withMessage(mustBeOneOfMsg(displayName, allowedValues));

export const optionalEnumField = (
  fieldName: string,
  displayName: string,
  allowedValues: string[],
) =>
  body(fieldName)
    .optional()
    .notEmpty()
    .withMessage(cannotBeEmptyMsg(displayName))
    .bail()
    .isString()
    .withMessage(mustBeStringMsg(displayName))
    .bail()
    .isIn(allowedValues)
    .withMessage(mustBeOneOfMsg(displayName, allowedValues));
