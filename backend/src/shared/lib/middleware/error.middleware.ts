import { NextFunction, Request, Response } from "express";
import ApiError from "@shared/lib/exceptions/ApiError";
import logger from "@shared/lib/logger.ts";

export default (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err instanceof ApiError ? err.status : 500;

  logger.error(err);

  res.status(statusCode).json({
    message: err.message || "Unknown error",
    error: err instanceof ApiError ? err : ApiError.Internal(),
  });
};
