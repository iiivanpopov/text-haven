import { Router } from "express";
import prisma from "@shared/lib/prisma.ts";
import validate from "@shared/validation/validate";
import AuthController from "./auth.controller";
import AuthService from "./auth.service.ts";
import { loginRules, registerRules } from "./validation/rules";

const router = Router();

const authService = new AuthService(prisma);
const authController = new AuthController(authService);

router.post("/register", registerRules, validate, authController.register);
router.post("/login", loginRules, validate, authController.login);
router.get("/refresh", authController.refresh);
router.post("/logout", authController.logout);

export default router;
