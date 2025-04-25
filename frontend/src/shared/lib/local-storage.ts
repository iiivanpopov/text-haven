import { AuthResponse } from "@features/auth/types";
import { Settings } from "@entities/settings/types";

export const setAccessToken = (response: AuthResponse): void => {
  if (
    "accessToken" in response.data &&
    typeof response.data.accessToken == "string"
  ) {
    localStorage.setItem("accessToken", response.data.accessToken);
  }
};

export const removeAccessToken = (): void => {
  localStorage.removeItem("accessToken");
};

export const setSettings = (settings: Settings): Settings => {
  if (settings) {
    localStorage.setItem("settings", JSON.stringify(settings));
    return settings;
  }
};

export const parseSettings = (): Settings | undefined => {
  const saved = localStorage.getItem("settings");
  return saved ? JSON.parse(saved) : undefined;
};

export const removeSettings = () => {
  localStorage.removeItem("settings");
};
