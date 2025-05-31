import type { CacheKeyFieldMap } from "@shared/lib/cache/types";

export const KEYS: CacheKeyFieldMap = {
  file: ["fileId", "folderId", "userId"],
  folder: ["folderId", "parentId", "userId"],
  settings: ["userId"],
  user: ["userId"],
  storage: ["folderId", "userId"],
  post: [],
};

export const STATUSES: ["PROTECTED", undefined] = ["PROTECTED", undefined];
