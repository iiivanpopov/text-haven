import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "@/api";
import { setSettings, setTheme } from "@store/reducers/settingsSlice";
import { Settings } from "@/models/Settings";
import { AppDispatch, RootState } from "@store/store";

export const parseSettings = () => (dispatch: AppDispatch) => {
  const settings = localStorage.getItem("settings");
  if (!settings) return;

  const parsedSettings: Settings = JSON.parse(settings);

  dispatch(setSettings(parsedSettings));

  document.documentElement.classList.toggle(
    "dark",
    parsedSettings.theme === "dark",
  );
};

export const toggleTheme =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const currentTheme = getState().settingsSlice.settings.theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    document.documentElement.classList.toggle("dark", newTheme === "dark");

    dispatch(setTheme(newTheme));
  };

export const fetchSettings = createAsyncThunk(
  "settings/fetch",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await $api.get<{ settings: Settings }>(
        "/api/user/settings",
      );

      dispatch(
        setTheme(response.data.settings.theme === "dark" ? "light" : "dark"),
      );

      document.documentElement.classList.toggle(
        "dark",
        response.data.settings.theme === "dark",
      );

      localStorage.setItem("settings", JSON.stringify(response.data.settings));

      return response.data.settings;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const saveSettings = createAsyncThunk(
  "settings/save",
  async (settings: Settings, { rejectWithValue }) => {
    try {
      const response = await $api.patch<{ settings: Settings }>(
        "/api/user/settings",
        settings,
      );

      localStorage.setItem("settings", JSON.stringify(settings));

      return response.data.settings;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
