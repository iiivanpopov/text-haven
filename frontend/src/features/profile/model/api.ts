import { api } from "@shared/api";
import type { ApiResponse } from "@shared/types";
import type { User } from "@entities/user/types";

const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, void, ApiResponse<User>>({
      query: () => `/user`,
      transformResponse: (response) => response.data,
      providesTags: (result) => [{ type: "User", id: result?.id }],
    }),
    updateUser: build.mutation<User, Partial<User>, ApiResponse<User>>({
      query: (user) => ({
        url: `user`,
        method: "PATCH",
        body: user,
      }),
      transformResponse: (response) => response.data,
      invalidatesTags: (result, error, user) => [{ type: "User", id: user.id }],
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
export default userApi;
