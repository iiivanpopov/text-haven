import type { Exposure, TextCategory } from "@shared/types";

export type Folder = {
  id: string;
  userId: string;
  parentId: string | undefined;
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
  textCategory: TextCategory;
};

type RootStorage = Folder & {
  isRoot: false;
  folders: { id: string; name: string }[];
  files: [];
};

type IdStorage = {
  isRoot: true;
  folders: { id: string; name: string }[];
  files: { id: string; name: string }[];
};

export type Storage = RootStorage | IdStorage;
