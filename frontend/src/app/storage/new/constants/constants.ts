import { Expiration } from "../types/types";

export const EXPOSURE_OPTIONS: { name: string; value: string }[] = [
  { name: "Private", value: "PRIVATE" },
  { name: "Public", value: "PUBLIC" },
];

export const EXPIRY_OPTIONS: { name: string; value: Expiration }[] = [
  { name: "1 min", value: 1000 * 60 },
  { name: "30 mins", value: 1000 * 60 * 30 },
  { name: "1 hour", value: 1000 * 60 * 60 },
  { name: "Never", value: "never" },
];

// TEMPORARY
const FOLDERS: { id: string; name: string }[] = [
  { id: "a", name: "Folder A" },
  { id: "b", name: "Folder B" },
];
export const FOLDER_OPTIONS = FOLDERS.map((folder) => {
  return { value: folder.id, name: folder.name };
});
