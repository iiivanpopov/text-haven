export type CacheEntityType =
  | "file"
  | "folder"
  | "settings"
  | "user"
  | "storage"
  | "post";

export type UserCacheParams = Partial<{
  userId: string;
  protected: boolean;
}>;

export type FileCacheParams = Partial<{
  userId: string;
  folderId: string;
  fileId: string;
  protected: boolean;
}>;

export type FolderCacheParams = Partial<{
  userId: string;
  folderId: string;
  parentId: string;
  protected: boolean;
}>;

export type CacheKeyParams = UserCacheParams &
  FileCacheParams &
  FolderCacheParams;

export type CacheKeyFieldMap = {
  file: ["fileId", "folderId", "userId"];
  folder: ["folderId", "parentId", "userId"];
  settings: ["userId"];
  user: ["userId"];
  storage: ["folderId", "userId"];
  post: [];
};
