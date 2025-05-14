import { Router } from "express";
import UserController from "@features/user/api/user.controller.ts";
import UserService from "@features/user/api/user.service.ts";
import {
  updateUserRules,
  updateUserSettingsRules,
} from "@features/user/lib/validation/rules.ts";
import cache from "@shared/lib/cache";
import auth from "@shared/lib/middleware/auth.middleware";
import prisma from "@shared/lib/prisma.ts";
import validate from "@shared/lib/validation/validate.ts";

const router = Router();

const userService = new UserService(prisma, cache);
const userController = new UserController(userService);

router.patch(
  "/user",
  updateUserRules,
  validate,
  auth,
  userController.updateUser,
);
router.patch(
  "/user/settings",
  updateUserSettingsRules,
  validate,
  auth,
  userController.saveSettings,
);
router.get("/user/settings", auth, userController.fetchSettings);

router.get("/user/:id", auth, userController.fetchUser);
router.get("/user", auth, userController.fetchUser);

export default router;
