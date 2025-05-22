import pino from "pino";
import ApiError from "@shared/lib/exceptions/ApiError";

const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  timestamp: pino.stdTimeFunctions.isoTime,
  base: undefined,
});

class Logger {
  info(message: string, data?: object) {
    logger.info(data ?? {}, message);
  }

  warn(message: string, data?: object) {
    logger.warn(data ?? {}, message);
  }

  debug(message: string, data?: object) {
    logger.debug(data ?? {}, message);
  }

  error(error: unknown, message?: string) {
    if (error instanceof ApiError) {
      logger.error(
        {
          status: error.status,
          name: error.name,
          stack: error.stack,
          errors: error.errors,
        },
        message ?? error.message,
      );
    } else if (error instanceof Error) {
      logger.error(
        {
          name: error.name,
          stack: error.stack,
        },
        message ?? error.message,
      );
    } else if (typeof error === "string") {
      logger.error({}, error);
    } else {
      logger.error({}, message ?? "Unknown error");
    }
  }
}

export default new Logger();
