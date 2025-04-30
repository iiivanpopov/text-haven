import pino from "pino";
import ApiError from "@shared/lib/exceptions/ApiError";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  timestamp: pino.stdTimeFunctions.isoTime,
  base: undefined,
});

class Logger {
  info(message: string, data?: unknown) {
    logger.info(data ?? {}, message);
  }

  error(error: unknown, message?: string) {
    if (error instanceof ApiError) {
      logger.error(
        { status: error.status, stack: error.stack, errors: error.errors },
        message ?? error.message,
      );
    } else if (error instanceof Error) {
      logger.error({ stack: error.stack }, message ?? error.message);
    } else {
      logger.error({}, message ?? "Unknown error");
    }
  }
}

export default new Logger();
