import { User } from "@entities/user/types";
import { ApiResponse } from "@shared/types";

export type AuthResponse = ApiResponse<{
  user: User;
  accessToken: string;
  refreshToken: string;
}>;
export type Credentials = { password: string; email: string };
export type LoginCredentials = Credentials;
export type RegisterCredentials = Credentials & { username: string };
