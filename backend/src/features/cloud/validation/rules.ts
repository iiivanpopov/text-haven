import { body } from "express-validator";
import {
  enumField,
  optionalStringField,
  stringField,
} from "@shared/validation/validators";

export const createFileRules = [
  stringField("folderId", "Folder id"),
  stringField("name", "Name"),
  stringField("content", "Content"),
  enumField("exposure", "Exposure", ["PRIVATE", "PUBLIC"]),
  enumField("textCategory", "textCategory", ["NOTE", "POST"]),
  body("expiresAt").optional().isISO8601().withMessage("Invalid date format"),
];

export const createFolderRules = [
  stringField("name", "Name"),
  enumField("exposure", "Exposure", ["PRIVATE", "PUBLIC"]),
  optionalStringField("parentId", "Parent id"),
];

export const updateFolderRules = [
  optionalStringField("name", "Name"),
  optionalStringField("parentId", "Parent id"),
  enumField("exposure", "Exposure", ["PRIVATE", "PUBLIC"]),
];

export const updateFileRules = [
  optionalStringField("name", "Name"),
  optionalStringField("folderId", "Folder id"),
  enumField("exposure", "Exposure", ["PRIVATE", "PUBLIC"]),
  enumField("textCategory", "textCategory", ["NOTE", "POST"]),
  body("expiresAt").optional().isISO8601().withMessage("Invalid date format"),
];

export const updateFileContentRules = [stringField("content", "Content")];
