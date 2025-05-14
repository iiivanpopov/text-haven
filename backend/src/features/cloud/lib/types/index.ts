import type { File } from "@prisma";

export type Post = Pick<File, "createdAt" | "id" | "name"> & {
  content: string;
};
