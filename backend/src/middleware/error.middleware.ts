import ApiError from "@exceptions/ApiError";
import logger from "@utils/logger.ts";
import { NextFunction, Request, Response } from "express";

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
