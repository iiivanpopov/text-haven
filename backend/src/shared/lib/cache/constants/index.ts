import type { Exposure } from "@prisma";
import type { CacheKeyFieldMap } from "@shared/lib/cache/types";

export const KEYS: CacheKeyFieldMap = {
  file: ["fileId", "folderId", "userId"],
  folder: ["folderId", "parentId", "userId"],
  settings: ["userId"],
  user: ["userId", "foreign"],
  storage: ["folderId", "userId"],
  post: [],
};

export const EXPOSURES: [Exposure, undefined] = ["PUBLIC", undefined];
