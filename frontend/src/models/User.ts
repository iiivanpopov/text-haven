export type Exposure = "PRIVATE" | "PUBLIC";

export interface User {
  id: string;
  username: string;
  email: string | undefined;
  exposure: Exposure;
}
