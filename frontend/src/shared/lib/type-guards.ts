import type { Storage } from "@features/storage/types";

export const isIdStorage = (
  storage: Storage,
): storage is Extract<Storage, { isRoot: false }> => !storage.isRoot;
