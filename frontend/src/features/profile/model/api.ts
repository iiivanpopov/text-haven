import type { User } from "@entities/user/types";
import { $api } from "@shared/api";
import type { ApiResponse } from "@shared/types";

const userApi = $api.injectEndpoints({
  endpoints: (build) => ({
    getUser: build.query<User, string | undefined, ApiResponse<User>>({
      query: (id) => `/user${id ? `/${id}` : ""}`,
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
      invalidatesTags: (_result, _error, user) => [
        { type: "User", id: user.id },
      ],
    }),
  }),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
export default userApi;
