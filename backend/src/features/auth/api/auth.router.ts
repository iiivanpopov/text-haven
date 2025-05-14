import { Router } from "express";
import { loginRules, registerRules } from "@features/auth/lib/validation/rules";
import prisma from "@shared/lib/prisma.ts";
import validate from "@shared/lib/validation/validate";
import AuthController from "./auth.controller";
import AuthService from "./auth.service.ts";

const router = Router();

const authService = new AuthService(prisma);
const authController = new AuthController(authService);

router.post("/register", registerRules, validate, authController.register);
router.post("/login", loginRules, validate, authController.login);
router.get("/refresh", authController.refresh);
router.post("/logout", authController.logout);

export default router;
