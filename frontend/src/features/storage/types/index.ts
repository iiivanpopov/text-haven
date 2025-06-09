import type { Exposure, TextCategory } from "@shared/types";

export type Folder = {
  id: string;
  userId: string;
  parentId?: string;
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

export type StorageListElement = { id: string; name: string };

type RootStorage = {
  isRoot: true;
  folders: StorageListElement[];
  files: StorageListElement[];
};

interface IdStorage extends Folder {
  isRoot: false;
  folders: StorageListElement[];
  files: [];
}

export type Storage = (RootStorage | IdStorage) & {
  user: {
    id: string;
  };
};

export const ListItem = {
  FOLDER: "FOLDER",
  FILE: "FILE",
} as const;
export type ListItem = (typeof ListItem)[keyof typeof ListItem];
