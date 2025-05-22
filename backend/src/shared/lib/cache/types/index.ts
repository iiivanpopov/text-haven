import type { Exposure } from "@prisma";

export type CacheEntityType =
  | "file"
  | "folder"
  | "settings"
  | "user"
  | "storage"
  | "post";

export type UserCacheParams = Partial<{
  userId: string;
  foreign: boolean;
}>;

export type FileCacheParams = Partial<{
  userId: string;
  folderId: string;
  fileId: string;
  exposure: Exposure;
}>;

export type FolderCacheParams = Partial<{
  userId: string;
  folderId: string;
  parentId: string;
  exposure: Exposure;
}>;

export type CacheKeyParams = UserCacheParams &
  FileCacheParams &
  FolderCacheParams;

export type CacheKeyFieldMap = {
  file: ["fileId", "folderId", "userId"];
  folder: ["folderId", "parentId", "userId"];
  settings: ["userId"];
  user: ["userId", "foreign"];
  storage: ["userId"];
  post: [];
};
