import type { Exposure, TextCategory } from "@prisma";

export default class FileDto {
  name?: string;
  folderId?: string;
  exposure?: Exposure;
  expiresAt?: Date;
  textCategory?: TextCategory;

  constructor(model: any) {
    this.name = model.name;
    this.folderId = model.folderId;
    this.exposure = model.exposure;
    this.textCategory = model.textCategory;
    if (model.expiresAt) this.expiresAt = new Date(model.expiresAt);
  }
}
