import type { Exposure } from "@shared/types";

const Role = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;
type Role = (typeof Role)[keyof typeof Role];

export interface User {
  id: string;
  role: Role;
  username: string;
  email: string;
  exposure: Exposure;
}
