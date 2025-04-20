import { optionalStringField, stringField } from "@utils/validators";
import { body } from "express-validator";

export const createFileRules = [
  stringField("folderId", "Folder id"),
  stringField("name", "Name"),
  stringField("content", "Content"),
  body("exposure")
    .exists()
    .withMessage("Exposure type is required")
    .notEmpty()
    .withMessage("Exposure type can't be empty")
    .isIn(["PRIVATE", "PUBLIC"])
    .withMessage(`"Exposure type must be either \"PRIVATE\" or \"PUBLIC\"`),
  body("type")
    .exists()
    .withMessage("Type is required")
    .notEmpty()
    .withMessage("Type can't be empty")
    .isIn(["POST", "NOTE"]),
  body("expiresAt").optional().isISO8601().withMessage("Invalid date format"),
];

export const createFolderRules = [
  stringField("name", "Name"),
  body("exposure")
    .exists()
    .withMessage("Exposure type is required")
    .notEmpty()
    .withMessage("Exposure type can't be empty")
    .isIn(["PRIVATE", "PUBLIC"])
    .withMessage('Exposure type must be either "PRIVATE" or "PUBLIC"'),
  optionalStringField("parentId", "Parent id"),
];

export const updateFolderRules = [
  optionalStringField("name", "Name"),
  optionalStringField("parentId", "Parent id"),
  body("exposure")
    .optional()
    .notEmpty()
    .withMessage("Exposure type can't be empty")
    .isIn(["PRIVATE", "PUBLIC"])
    .withMessage('Exposure type must be either "PRIVATE" or "PUBLIC"'),
];

export const updateFileRules = [
  optionalStringField("name", "Name"),
  optionalStringField("folderId", "Folder id"),
  body("exposure")
    .optional()
    .notEmpty()
    .withMessage("Exposure type can't be empty")
    .isIn(["PRIVATE", "PUBLIC"])
    .withMessage('Exposure type must be either "PRIVATE" or "PUBLIC"'),
  body("type")
    .optional()
    .notEmpty()
    .withMessage("Type can't be empty")
    .isIn(["POST", "NOTE"])
    .withMessage('Type must be either "POST" or "NOTE"'),
  body("expiresAt").optional().isISO8601().withMessage("Invalid date format"),
];

export const updateFileContentRules = [stringField("content", "Content")];
