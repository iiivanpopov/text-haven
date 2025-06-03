import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "@features/auth/types";
import { $api } from "@shared/api";

const authApi = $api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: `login`,
        method: "POST",
        body: credentials,
      }),
    }),
    register: build.mutation<AuthResponse, RegisterCredentials>({
      query: (credentials) => ({
        url: `register`,
        method: "POST",
        body: credentials,
      }),
    }),
    logout: build.mutation<AuthResponse, void>({
      query: () => ({
        url: `logout`,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
