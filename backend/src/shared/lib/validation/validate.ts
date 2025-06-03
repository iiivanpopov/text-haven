import type { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import ApiError from "@shared/lib/exceptions/ApiError";

export default function Validate(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(ApiError.BadRequest("Data validation error", errors.array()));
  }
  next();
}
