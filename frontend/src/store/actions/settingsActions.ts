import { createAsyncThunk } from "@reduxjs/toolkit";
import $api from "@/api";
import { setSettings, setTheme } from "@store/slices/settingsSlice";
import { Settings, Theme } from "@/models/Settings";
import { AppDispatch, RootState } from "@store/store";

import {
  applyTheme,
  loadSettingsFromStorage,
  saveSettingsToStorage,
} from "@/utils/settings";

export const parseSettings = () => (dispatch: AppDispatch) => {
  const storedSettings = loadSettingsFromStorage();
  if (!storedSettings) return;

  dispatch(setSettings(storedSettings));
  applyTheme(storedSettings.theme);
};

export const toggleTheme =
  () => (dispatch: AppDispatch, getState: () => RootState) => {
    const currentSettings = getState().settingsReducer.settings;
    const newTheme: Theme = currentSettings.theme === "dark" ? "light" : "dark";

    const updatedSettings = {
      ...currentSettings,
      theme: newTheme,
    };

    applyTheme(newTheme);
    dispatch(setTheme(newTheme));
    saveSettingsToStorage(updatedSettings);
  };

export const fetchSettings = createAsyncThunk<
  Settings,
  void,
  { rejectValue: unknown; dispatch: AppDispatch }
>("settings/fetch", async (_, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await $api.get<{ settings: Settings }>("user/settings");
    const settings = data.settings;

    dispatch(setSettings(settings));
    applyTheme(settings.theme);
    saveSettingsToStorage(settings);

    return settings;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const saveSettings = createAsyncThunk<
  Settings,
  Settings,
  { rejectValue: unknown }
>("settings/save", async (settings, { rejectWithValue }) => {
  try {
    const { data } = await $api.patch<{ settings: Settings }>(
      "user/settings",
      settings,
    );

    saveSettingsToStorage(settings);

    return data.settings;
  } catch (error) {
    return rejectWithValue(error);
  }
});
