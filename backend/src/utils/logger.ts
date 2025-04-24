import ApiError from "@exceptions/ApiError";

class Logger {
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  log(data: unknown): void {
    console.log(`[${this.getTimestamp()}] [INFO]:`, data);
  }

  error(message: string, error: unknown): void;
  error(error: unknown): void;

  error(arg1: string | unknown, arg2?: unknown): void {
    const timestamp = this.getTimestamp();

    if (typeof arg1 === "string" && arg2 !== undefined) {
      const message = arg1;
      const error = arg2;

      if (error instanceof ApiError) {
        console.error(
          `[${timestamp}] [ERROR]: ${message} - ${error.message} (Status: ${error.status})`,
        );
        console.log(error.errors);
      } else if (error instanceof Error) {
        console.error(
          `[${timestamp}] [ERROR]: ${message} - ${error.message}\nStack: ${error.stack}`,
        );
      } else {
        console.error(`[${timestamp}] [ERROR]: ${message} - Unknown error`);
      }
    } else {
      const error = arg1;

      if (error instanceof ApiError) {
        console.error(
          `[${timestamp}] [ERROR]: ${error.message} (Status: ${error.status})`,
        );
        console.log(error.errors);
      } else if (error instanceof Error) {
        console.error(
          `[${timestamp}] [ERROR]: ${error.message}\nStack: ${error.stack}`,
        );
      } else {
        console.error(`[${timestamp}] [ERROR]: Unknown error`);
      }
    }
  }
}

export default new Logger();
