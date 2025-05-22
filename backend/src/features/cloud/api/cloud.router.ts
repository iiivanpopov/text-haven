import { Router } from "express";
import {
  createFileRules,
  createFolderRules,
  updateFileContentRules,
  updateFileRules,
  updateFolderRules,
} from "@features/cloud/lib/validation/rules.ts";
import cache from "@shared/lib/cache";
import auth from "@shared/lib/middleware/auth.middleware";
import prisma from "@shared/lib/prisma.ts";
import storage from "@shared/lib/storage";
import validate from "@shared/lib/validation/validate";
import CloudController from "./cloud.controller.ts";
import CloudService from "./cloud.service.ts";

const router = Router();

const cloudService = new CloudService(prisma, storage, cache);
const cloudController = new CloudController(cloudService);

// Folders
// Post
router.post(
  "/folders",
  auth,
  createFolderRules,
  validate,
  cloudController.createFolder,
);

// Get
router.get("/folders", auth, cloudController.getFolders);

// Patch
router.patch(
  "/folders/:id",
  auth,
  updateFolderRules,
  validate,
  cloudController.updateFolder,
);

// Delete
router.delete("/folders/:id", auth, cloudController.deleteFolder);

// Files
// Post
router.post(
  "/files",
  auth,
  createFileRules,
  validate,
  cloudController.createFile,
);

// Get
router.get("/files", auth, cloudController.getFilesOrFile);
router.get("/files/:id/content", auth, cloudController.getFileContent);
router.get("/posts", cloudController.getLatestPosts);

// Patch
router.patch(
  "/files/:id",
  auth,
  updateFileRules,
  validate,
  cloudController.updateFile,
);
router.patch(
  "/files/:id/content",
  auth,
  updateFileContentRules,
  validate,
  cloudController.updateFileContent,
);

// Delete
router.delete("/files/:id", auth, cloudController.deleteFile);

// Storage
router.get("/storage/:id", auth, cloudController.getUserContent);
router.get("/storage", auth, cloudController.getUserContent);

export default router;
