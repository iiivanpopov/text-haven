import type { Exposure, Role } from "@prisma";

export default class PrivateUser {
  id: string;
  role: Role;
  username: Role;
  exposure: Exposure;

  constructor(model: any) {
    this.exposure = model.exposure;
    this.id = model.id;
    this.role = model.role;
    this.username = model.username;
  }
}
