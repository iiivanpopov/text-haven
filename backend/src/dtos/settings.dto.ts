import { FileType, Theme } from "@prisma";

export default class SettingsDto {
  textDefaultType: FileType;
  theme: Theme;

  constructor(model: any) {
    this.textDefaultType = model.textDefaultType;
    this.theme = model.theme;
  }
}
