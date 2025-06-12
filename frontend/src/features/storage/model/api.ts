import type { File, Folder, Storage } from "@features/storage/types";
import { $api } from "@shared/api";
import type { ApiResponse } from "@shared/types";

const storageApi = $api.injectEndpoints({
  endpoints: (build) => ({
    getStorage: build.query<ApiResponse<Storage>, string | undefined>({
      query: (id: string | undefined) => `/storage${id ? `/${id}` : ""}`,
    }),
    getFolders: build.query<ApiResponse<Folder[]>, void>({
      query: () => `/folders`,
    }),
    createFile: build.mutation<ApiResponse<File>, Omit<File, "id" | "userId">>({
      query: (file) => ({ url: `/files`, method: "POST", body: file }),
    }),
    createFolder: build.mutation<
      ApiResponse<Folder>,
      Omit<Folder, "id" | "userId" | "createdAt">
    >({
      query: (folder) => ({ url: `/folders`, method: "POST", body: folder }),
    }),
    deleteFile: build.mutation<ApiResponse<File>, string>({
      query: (id) => ({ url: `/files/${id}`, method: "DELETE" }),
    }),
    deleteFolder: build.mutation<ApiResponse<File>, string>({
      query: (id) => ({ url: `/folders/${id}`, method: "DELETE" }),
    }),
  }),
});

export const {
  useGetStorageQuery,
  useCreateFileMutation,
  useGetFoldersQuery,
  useCreateFolderMutation,
  useDeleteFileMutation,
  useDeleteFolderMutation,
} = storageApi;
