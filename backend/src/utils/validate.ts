import ApiError from "@exceptions/ApiError";
import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

export default function (req: Request, _res: Response, next: NextFunction) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(ApiError.BadRequest("Data validation error", errors.array()));
  }
  next();
}
