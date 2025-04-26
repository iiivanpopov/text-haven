import type { AuthResponse } from "@features/auth/types";
import type { Settings } from "@entities/settings/types";

const ACCESS_TOKEN_KEY = "accessToken";
const SETTINGS_KEY = "settings";

export const setAccessToken = ({ data }: AuthResponse): void => {
  if (typeof data?.accessToken === "string") {
    localStorage.setItem(ACCESS_TOKEN_KEY, data.accessToken);
  }
};

export const removeAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const setLocalSettings = (settings: Settings): void => {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};

export const parseSettings = (): Settings | undefined => {
  const saved = localStorage.getItem(SETTINGS_KEY);
  return saved ? JSON.parse(saved) : undefined;
};

export const removeSettings = (): void => {
  localStorage.removeItem(SETTINGS_KEY);
};
