import { Settings } from "@/models/Settings";

export const applyTheme = (theme: string) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
};

export const saveSettingsToStorage = (settings: Settings) => {
  localStorage.setItem("settings", JSON.stringify(settings));
};

export const loadSettingsFromStorage = (): Settings | null => {
  const settings = localStorage.getItem("settings");
  return settings ? JSON.parse(settings) : null;
};
