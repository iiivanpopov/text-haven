import ApiError from "@exceptions/ApiError";
import type { NextFunction, Request, Response } from "express";
import Jwt, { TokenType } from "@shared/jwt";

export default function (req: Request, _res: Response, next: NextFunction) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) return next(ApiError.Unauthorized());

    const accessToken = authorizationHeader?.split(" ")[1];
    if (!accessToken) return next(ApiError.Unauthorized());

    const userData = Jwt.validateToken(accessToken, TokenType.ACCESS);
    if (!userData) return next(ApiError.Unauthorized());

    req.user = userData;
    next();
  } catch (error) {
    next(ApiError.Unauthorized());
  }
}
