import { Exposure, SelectOptions, TextCategory, Theme } from "@shared/types";

export const TEXT_CATEGORIES: SelectOptions<TextCategory> = [
  {
    name: "Note",
    value: TextCategory.NOTE,
  },
  {
    name: "Post",
    value: TextCategory.POST,
  },
];

export const EXPOSURES: SelectOptions<Exposure> = [
  {
    name: "Public",
    value: Exposure.PUBLIC,
  },
  {
    name: "Private",
    value: Exposure.PRIVATE,
  },
];

export const THEMES: SelectOptions<Theme> = [
  {
    name: "Light",
    value: Theme.LIGHT,
  },
  {
    name: "Dark",
    value: Theme.DARK,
  },
];

export const EXPIRY_OPTIONS: SelectOptions = [
  { name: "1 min", value: String(1000 * 60) },
  { name: "30 mins", value: String(1000 * 60 * 30) },
  { name: "1 hour", value: String(1000 * 60 * 60) },
  { name: "1 day", value: String(1000 * 60 * 60 * 24) },
];
