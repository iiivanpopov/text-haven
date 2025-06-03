import type { ApiResponse } from "@shared/types";
import { User } from "@features/profile/types";

export type AuthResponse = ApiResponse<{
  user: User;
  accessToken: string;
  refreshToken: string;
}>;
type Credentials = { password: string; email: string };
export type LoginCredentials = Credentials;
export type RegisterCredentials = Credentials & { username: string };
