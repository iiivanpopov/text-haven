import { TextCategory, Theme } from "@prisma";

export default class SettingsDto {
  textCategory: TextCategory;
  theme: Theme;

  constructor(model: any) {
    this.textCategory = model.textCategory;
    this.theme = model.theme;
  }
}
