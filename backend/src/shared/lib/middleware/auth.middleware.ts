import type { NextFunction, Request, Response } from "express";
import ApiError from "@shared/lib/exceptions/ApiError";
import { validateAccessToken } from "@shared/lib/jwt";

export default function AuthMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return next(ApiError.Unauthorized());

    const accessToken = authorizationHeader?.split(" ")[1];
    if (!accessToken) return next(ApiError.Unauthorized());

    const userData = validateAccessToken(accessToken);
    if (!userData) return next(ApiError.Unauthorized());

    req.user = userData;
    next();
  } catch (_error: unknown) {
    next(ApiError.Unauthorized());
  }
}
