import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { AuthResponse } from "@features/auth/types";
import { removeAccessToken, setAccessToken } from "@shared/lib/local-storage";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      { url: "/refresh", method: "GET" },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      setAccessToken(refreshResult as AuthResponse);

      result = await baseQuery(args, api, extraOptions);
    } else {
      removeAccessToken();
    }
  }

  return result;
};

const $api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  tagTypes: ["User", "Text"],
});

export default $api;
