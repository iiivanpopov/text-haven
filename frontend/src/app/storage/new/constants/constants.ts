import { Expiration, Exposure } from "../types/types";

export const EXPOSURE_OPTIONS: { name: string; value: Exposure }[] = [
  { name: "Private", value: "PRIVATE" },
  { name: "Public", value: "PUBLIC" },
];

export const EXPIRY_OPTIONS: { name: string; value: Expiration }[] = [
  { name: "1 min", value: String(1000 * 60) },
  { name: "30 mins", value: String(1000 * 60 * 30) },
  { name: "1 hour", value: String(1000 * 60 * 60) },
  { name: "Never", value: "never" },
];
