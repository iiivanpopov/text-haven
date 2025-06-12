import { $api } from "@shared/api";
import type { ApiResponse } from "@shared/types";
import type { User } from "@features/profile/types";

const userApi = $api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<ApiResponse<User>, string | undefined>({
      query: (id) => `/user${id ? `/${id}` : ""}`,
    }),
    updateUser: build.mutation<ApiResponse<User>, Partial<User>>({
      query: (user) => ({
        url: `user`,
        method: "PATCH",
        body: user,
      }),
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
