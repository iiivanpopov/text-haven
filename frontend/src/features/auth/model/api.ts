import { $api } from "@shared/api";
import type {
  AuthResponse,
  LoginCredentials,
  RegisterCredentials,
} from "@features/auth/types";

const authApi = $api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, LoginCredentials, AuthResponse>({
      query: (credentials) => ({
        url: `login`,
        method: "POST",
        body: credentials,
      }),
    }),
    register: build.mutation<AuthResponse, RegisterCredentials, AuthResponse>({
      query: (credentials) => ({
        url: `register`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
