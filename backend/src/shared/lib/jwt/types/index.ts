import type { Role } from "@prisma";

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
