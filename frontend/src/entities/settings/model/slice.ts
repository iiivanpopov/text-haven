import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Settings } from "@entities/settings/types";
import { TextCategory, Theme } from "@shared/types";

interface SettingsState {
  settings: Settings;
  isLoaded: boolean;
}

const initialState: SettingsState = {
  settings: {
    theme: Theme.LIGHT,
    textCategory: TextCategory.NOTE,
  },
  isLoaded: false,
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
    setIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
  },
});

export const { setSettings, setTheme, setIsLoaded } = settingsSlice.actions;
export default settingsSlice.reducer;
