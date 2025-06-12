import type { Storage } from "@features/storage/types";
import { ApiResponse } from "@shared/types";

export const isIdStorage = (
  storage: Storage,
): storage is Extract<Storage, { isRoot: false }> => !storage.isRoot;

export const responseIsError = (
  response: unknown,
): response is { data: ApiResponse } =>
  typeof response === "object" && response !== null && "status" in response;
