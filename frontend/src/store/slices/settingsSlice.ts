import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchSettings, saveSettings } from "@store/actions/settingsActions";
import { Settings, Theme } from "@models/Settings";

interface SettingsState {
  settings: Settings;
  isLoading: boolean;
  error: string;
}

const initialState: SettingsState = {
  settings: { textDefaultType: "NOTE", theme: "light" },
  isLoading: false,
  error: "",
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      })

      .addCase(saveSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveSettings.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.settings = action.payload;
      })
      .addCase(saveSettings.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { setSettings, setTheme } = settingsSlice.actions;
export default settingsSlice.reducer;
