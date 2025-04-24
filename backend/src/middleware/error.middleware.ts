import ApiError from "@exceptions/ApiError";
import { NextFunction, Request, Response } from "express";
import logger from "@utils/logger.ts";

export default (
  err: Error | ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err instanceof ApiError ? err.status : 500;
  const message =
    process.env.NODE_ENV === "production" && statusCode === 500
      ? "Internal Server Error"
      : err.message;
  const errors = err instanceof ApiError ? err.errors : undefined;

  logger.error(err);

  res.status(statusCode).json({
    status: "error",
    message,
    errors,
  });
};
