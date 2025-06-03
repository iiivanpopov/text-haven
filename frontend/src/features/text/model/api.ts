import { $api } from "@shared/api";
import type { Text } from "@features/text/types";
import { ApiResponse } from "@shared/types";

export type FileMeta = Text;

export type FileContent = {
  content: string;
};

export interface FileData {
  meta: FileMeta;
  content: FileContent;
}

const fileApi = $api.injectEndpoints({
  endpoints: (build) => ({
    fetchFile: build.query<FileData, string>({
      async queryFn(fileId, _queryApi, _extraOptions, fetchWithBQ) {
        const metaResult = await fetchWithBQ(`/files?fileId=${fileId}`);
        if (metaResult.error) return { error: metaResult.error };

        const contentResult = await fetchWithBQ(`/files/${fileId}/content`);
        if (contentResult.error) return { error: contentResult.error };

        return {
          data: {
            meta: (metaResult.data as ApiResponse<FileMeta>).data as FileMeta,
            content: (contentResult.data as ApiResponse<FileContent>)
              .data as FileContent,
          },
        };
      },
      providesTags: (result, error, id) =>
        result ? [{ type: "Text", id }] : [],
    }),

    updateFile: build.mutation<
      { success: boolean },
      { id: string; meta: Partial<FileMeta>; content: FileContent }
    >({
      async queryFn(
        { id, meta, content },
        _queryApi,
        _extraOptions,
        fetchWithBQ,
      ) {
        const metaResult = await fetchWithBQ({
          url: `/files/${id}`,
          method: "PATCH",
          body: meta,
        });
        if (metaResult.error) return { error: metaResult.error };

        const contentResult = await fetchWithBQ({
          url: `/files/${id}/content`,
          method: "PATCH",
          body: content,
        });
        if (contentResult.error) return { error: contentResult.error };

        return { data: { success: true } };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Text", id }],
    }),
  }),
  overrideExisting: false,
});

export const { useFetchFileQuery, useUpdateFileMutation } = fileApi;
