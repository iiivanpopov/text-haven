import path from "path";
import logger from "@utils/logger";
import { env } from "bun";
export { default } from "./routes";

const worker = new Worker(
  path.resolve(
    env.NODE_ENV == "production" ? "dist" : "src",
    "workers",
    "worker.js",
  ),
);

setInterval(() => worker.postMessage("clear"), 1000 * 60);
worker.onmessage = (event) => {
  logger.log(event.data);
};
worker.onerror = (event) => {
  logger.error(event.error);
};
