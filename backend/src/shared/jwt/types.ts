import { Role } from "@prisma";

export const enum TokenType {
  ACCESS,
  REFRESH,
}

export interface Payload {
  id: string;
  email: string;
  username: string;
  role: Role;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}
