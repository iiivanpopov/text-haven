import type { User } from "@entities/user/types";
import { $api } from "@shared/api";
import type { ApiResponse } from "@shared/types";

const userApi = $api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, string | undefined, ApiResponse<User>>({
      query: (id) => `/user${id ? `/${id}` : ""}`,
      transformResponse: (response) => response.data,
    }),
    updateUser: build.mutation<User, Partial<User>, ApiResponse<User>>({
      query: (user) => ({
        url: `user`,
        method: "PATCH",
        body: user,
      }),
      transformResponse: (response) => response.data,
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
