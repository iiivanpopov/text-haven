import type { TextCategory } from "@shared/types";

export type Theme = "dark" | "light";

export interface Settings {
  theme: Theme;
  textCategory: TextCategory;
}
