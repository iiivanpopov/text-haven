import type { CacheKeyFieldMap } from "@shared/lib/cache/types";

export const KEYS: CacheKeyFieldMap = {
  FILE: ["fileId", "folderId", "userId"],
  FOLDER: ["folderId", "parentId", "userId"],
  SETTINGS: ["userId"],
  USER: ["userId"],
  STORAGE: ["folderId", "userId"],
  POST: [],
};

export const STATUSES: ["PROTECTED", undefined] = ["PROTECTED", undefined];
