import type { Post } from "@widgets/posts/types";
import { $api } from "@shared/api";
import type { ApiResponse } from "@shared/types";

const postsApi = $api.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<ApiResponse<Post[]>, void>({
      query: () => `/posts`,
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
