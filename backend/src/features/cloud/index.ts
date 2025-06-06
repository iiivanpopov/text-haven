import path from "path";
import { env } from "bun";
import logger from "@shared/lib/logger";

export { default } from "@features/cloud/api/cloud.router.ts";

const worker = new Worker(
  path.resolve(
    env.NODE_ENV == "production" ? "dist" : "src",
    "app",
    "lib",
    "worker.js",
  ),
);

setInterval(() => worker.postMessage("clear"), 1000 * 60);
worker.onmessage = (event) => {
  logger.info(event.data);
};
worker.onerror = (event) => {
  logger.error(event.error);
};
