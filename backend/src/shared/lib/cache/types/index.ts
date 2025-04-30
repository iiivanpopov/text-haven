import { Exposure } from "@prisma";

export type CacheKeyFields = (keyof CacheKeyParams)[];
export type CacheEntityType = "file" | "folder" | "settings" | "user";
export type CacheKeyParams = {
  exposure?: Exposure; // Public | Private
  userId?: string;
  parentId?: string;
  folderId?: string;
  fileId?: string;
};
export type CacheKeyFieldMap = Record<CacheEntityType, CacheKeyFields>;
