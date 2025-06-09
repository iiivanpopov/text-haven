import type { ApiResponse } from "@shared/types";
import type { User } from "@features/profile/types";

export type AuthResponse = ApiResponse<{
  user: User;
  accessToken: string;
  refreshToken: string;
}>;
type Credentials = { password: string; email: string };
export type LoginCredentials = Credentials;
export interface RegisterCredentials extends Credentials {
  username: string;
}
