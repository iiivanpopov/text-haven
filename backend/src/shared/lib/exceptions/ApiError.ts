import type { ValidationError } from "express-validator";

type IncomingError = Error | ValidationError;
type Errors = IncomingError[];

class ApiError extends Error {
  readonly status: number;
  readonly errors: Errors;

  constructor(status: number, message: string, errors: Errors = []) {
    super(message);
    Object.setPrototypeOf(this, ApiError.prototype);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message = "Bad request", errors: Errors = []): ApiError {
    return new ApiError(400, message, errors);
  }

  static Unauthorized(message = "Unauthorized"): ApiError {
    return new ApiError(401, message);
  }

  static Forbidden(message = "Forbidden"): ApiError {
    return new ApiError(403, message);
  }

  static NotFound(message = "Not found"): ApiError {
    return new ApiError(404, message);
  }

  static Internal(message = "Unexpected error"): ApiError {
    return new ApiError(500, message);
  }
}

export default ApiError;
