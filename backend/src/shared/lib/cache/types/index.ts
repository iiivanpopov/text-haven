export const CacheEntity = {
  FILE: "FILE",
  FOLDER: "FOLDER",
  SETTINGS: "SETTINGS",
  USER: "USER",
  STORAGE: "STORAGE",
  POST: "POST",
} as const;
export type CacheEntity = (typeof CacheEntity)[keyof typeof CacheEntity];

export type UserCacheParams = {
  userId?: string;
  protected?: boolean;
};

export type FileCacheParams = {
  fileId?: string;
  folderId?: string;
  userId?: string;
  protected?: boolean;
};

export type FolderCacheParams = {
  folderId?: string;
  parentId?: string;
  userId?: string;
  protected?: boolean;
};

export type StorageCacheParams = {
  folderId?: string;
  userId?: string;
};

export type SettingsCacheParams = {
  userId?: string;
};

export type PostCacheParams = object;

export type CacheKeyMap = {
  FILE: FileCacheParams;
  FOLDER: FolderCacheParams;
  SETTINGS: SettingsCacheParams;
  USER: UserCacheParams;
  STORAGE: StorageCacheParams;
  POST: PostCacheParams;
};

export type CacheKeyFieldMap = {
  [K in keyof CacheKeyMap]: (keyof CacheKeyMap[K])[];
};
