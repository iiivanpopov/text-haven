import type { Exposure } from "@shared/types";

type Role = "ADMIN" | "USER";

export interface User {
  id: string;
  role: Role;
  username: string;
  email: string;
  exposure: Exposure;
}
