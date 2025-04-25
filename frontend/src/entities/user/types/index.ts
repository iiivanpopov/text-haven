import type { Exposure, Role } from "@shared/types";

export interface User {
  id: string;
  role: Role;
  username: string;
  email: string;
  exposure: Exposure;
}
