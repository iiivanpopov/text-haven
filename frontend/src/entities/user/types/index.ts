import type { Exposure } from "@shared/types";

export type Role = "ADMIN" | "USER";

export interface User {
  id: string;
  role: Role;
  username: string;
  email: string;
  exposure: Exposure;
}
