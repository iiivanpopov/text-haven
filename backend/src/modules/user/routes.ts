import config from "@config";
import auth from "@middleware/auth.middleware";
import Cache from "@shared/cache";
import jwt from "@shared/jwt";
import validate from "@utils/validate";
import { Router } from "express";
import UserController from "./controller";
import { updateRules } from "./rules";
import UserService from "./service";

const router = Router();

const userService = new UserService(config.PRISMA, jwt, Cache);
const userController = new UserController(userService);

router.patch("/user", updateRules, validate, auth, userController.updateUser);
router.patch("/user/settings", auth, userController.saveSettings);
router.get("/user/settings", auth, userController.fetchSettings);

router.get("/user/:id", auth, userController.fetchUser);
router.get("/user", auth, userController.fetchUser);

export default router;
