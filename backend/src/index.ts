import config from "@config";
import logger from "@utils/logger";
import type { Server } from "http";
import app from "./app";
import * as https from "node:https";
import path from "path";

let server: Server;

const options = {
  // make cookies work...
  key: await Bun.file(path.resolve("creds/server.key")).text(),
  cert: await Bun.file(path.join("creds/server.crt")).text(),
};

config.PRISMA.$connect().then(() => {
  server = https
    .createServer(options, app)
    .listen(config.PORT, () => logger.log(`Listening to port ${config.PORT}.`));
});

const onCloseSignal = () => {
  config.PRISMA.$disconnect().then(() => {
    server.close();
    process.exit();
  });
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
