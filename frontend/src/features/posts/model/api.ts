import type { Post } from "@entities/post/types";
import { api } from "@shared/api";
import type { ApiResponse } from "@shared/types";

const postsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPosts: build.query<Post[], void, ApiResponse<Post[]>>({
      query: () => `/posts`,
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
