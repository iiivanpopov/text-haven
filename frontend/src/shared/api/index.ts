import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { removeAccessToken, setAccessToken } from "@shared/lib/local-storage";
import { AuthResponse } from "@features/auth/types";
import axios from "axios";

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

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({}),
  tagTypes: ["User", "Text"],
});

export const $axios = axios.create({
  withCredentials: true,
  baseURL: process.env.API_URL,
});

$axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

$axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status == 401 && !error.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(
          `${process.env.API_URL}/refresh`,
          { withCredentials: true },
        );
        setAccessToken(response.data);
        return $axios.request(originalRequest);
      } catch (e) {
        console.log("Unauthorized");
      }
    }
    throw error;
  },
);
