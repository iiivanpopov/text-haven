import { Theme } from "@shared/types";

export const applyTheme = (theme: string) =>
  document.documentElement.classList.toggle(Theme.DARK, theme == Theme.DARK);
