import type { Server } from "http";
import https from "node:https";
import path from "path";
import app from "@app/lib/router";
import config from "@shared/config";
import logger from "@shared/lib/logger.ts";
import prisma from "@shared/lib/prisma.ts";

let server: Server;

const options = {
  key: await Bun.file(path.resolve("credentials", "server.key")).text(),
  cert: await Bun.file(path.resolve("credentials", "server.crt")).text(),
};

prisma.$connect().then(() => {
  server = https
    .createServer(options, app)
    .listen(config.PORT, () =>
      logger.info(`Listening to port ${config.PORT}.`),
    );
});

const onCloseSignal = () => {
  prisma.$disconnect().then(() => {
    server.close();
    process.exit();
  });
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
