import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "@/api";
import { setSettings, setTheme } from "@store/slices/settingsSlice";
import { Settings } from "@/models/Settings";
import { AppDispatch, RootState } from "@store/store";

import {
  applyTheme,
  loadSettingsFromStorage,
  saveSettingsToStorage,
} from "@/utils/settings";

export const parseSettings = () => (dispatch: AppDispatch) => {
  const parsedSettings = loadSettingsFromStorage();
  if (!parsedSettings) return;

  dispatch(setSettings(parsedSettings));
  applyTheme(parsedSettings.theme);
};

export const toggleTheme =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const currentTheme = getState().settingsSlice.settings.theme;
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    applyTheme(newTheme);
    dispatch(setTheme(newTheme));
  };

export const fetchSettings = createAsyncThunk(
  "settings/fetch",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await $api.get<{ settings: Settings }>(
        "/api/user/settings",
      );

      const settings = response.data.settings;

      dispatch(setTheme(settings.theme === "dark" ? "light" : "dark"));
      applyTheme(settings.theme);
      saveSettingsToStorage(settings);

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

      saveSettingsToStorage(settings);

      return response.data.settings;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
