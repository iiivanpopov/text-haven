import { Router } from "express";
import UserController from "@features/user/user.controller.ts";
import UserService from "@features/user/user.service.ts";
import {
  updateUserRules,
  updateUserSettingsRules,
} from "@features/user/validation/rules.ts";
import cache from "@shared/lib/cache";
import prisma from "@shared/lib/prisma.ts";
const router = Router();
import auth from "@shared/middleware/auth.middleware";
import validate from "@shared/validation/validate.ts";

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
