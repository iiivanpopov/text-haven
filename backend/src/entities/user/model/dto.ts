import type { Exposure, Role } from "@prisma";

export default class UserDto {
  id: string;
  role: Role;
  email: string;
  username: Role;
  exposure: Exposure;

  constructor(model: any) {
    this.exposure = model.exposure;
    this.id = model.id;
    this.role = model.role;
    this.username = model.username;
    this.email = model.email;
  }
}
