import type { User } from "@models/User";

export interface ValidationError {
  status: string;
  message: string;
  errors: {
    type: string;
    value: string;
    msg: string;
    path: string;
    location: string;
  }[];
}

export type AuthResponse = {
  user: User;
  accessToken: string;
  refreshToken: string;
};
