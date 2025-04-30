import CloudService from "@features/cloud/cloud.service.ts";
import cache from "@shared/lib/cache";
import prisma from "@shared/lib/prisma.ts";
import storage from "@shared/lib/storage";

declare var self: Worker; // prevent ts errors

const cloudService = new CloudService(prisma, storage, cache);

self.onmessage = () => {
  cloudService
    .clearExpiredFiles()
    .then(() => self.postMessage("Worker: task done."));
};
