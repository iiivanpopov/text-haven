import type { Exposure, TextCategory } from "@shared/types";

export type Folder = {
  id: string;
  userId: string;
  parentId: any;
  name: string;
  exposure: string;
  createdAt: string;
};

export type File = {
  id: string;
  userId: string;
  folderId: string;
  name: string;
  exposure: Exposure;
  expiresAt: string | Date;
  type: TextCategory;
};

export type RootStorage = {
  isRoot: true;
  data: Folder[];
};

export type IdStorage = {
  isRoot: false;
  data: Folder & {
    folders: { id: string; name: string }[];
    files: { id: string; name: string }[];
  };
};

export type Storage = RootStorage | IdStorage;
