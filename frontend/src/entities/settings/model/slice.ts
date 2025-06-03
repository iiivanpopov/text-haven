import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import settingsApi from "@entities/settings/model/api";
import type { Settings } from "@entities/settings/types";
import { TextCategory, Theme } from "@shared/types";

interface SettingsState {
  settings: Settings;
}

const initialState: SettingsState = {
  settings: { theme: Theme.LIGHT, textCategory: TextCategory.NOTE },
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<Settings>) => {
      state.settings = action.payload;
    },
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.settings.theme = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder.addMatcher(
      settingsApi.endpoints.getSettings.matchFulfilled,
      (state, action) => {
        state.settings = action.payload;
      },
    ),
});

export const { setSettings, setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
