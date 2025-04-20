export interface User {
  id: string;
  username: string;
  email: string | undefined;
  exposure: "PRIVATE" | "PUBLIC";
}
