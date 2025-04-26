import { $api } from "@shared/api";
import type { ApiResponse } from "@shared/types";
import type { File, Folder, Storage } from "@entities/storage/types";

const storageApi = $api.injectEndpoints({
  endpoints: (build) => ({
    getStorage: build.query<Storage, string | undefined, ApiResponse<Storage>>({
      query: (id: string | undefined) => `/storage${id ? `/${id}` : ""}`,
      transformResponse: (response) => response.data,
    }),
    getFolders: build.query<Folder[], void, ApiResponse<Folder[]>>({
      query: () => `/folders`,
      transformResponse: (response) => response.data,
    }),
    createFile: build.mutation<
      File,
      Omit<File, "id" | "userId">,
      ApiResponse<File>
    >({
      query: (file) => ({ url: `/files`, method: "POST", body: file }),
      transformResponse: (response) => response.data,
    }),
    createFolder: build.mutation<
      Folder,
      Omit<Folder, "id" | "userId" | "createdAt">,
      ApiResponse<Folder>
    >({
      query: (folder) => ({ url: `/folders`, method: "POST", body: folder }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const {
  useGetStorageQuery,
  useCreateFileMutation,
  useGetFoldersQuery,
  useCreateFolderMutation,
} = storageApi;
