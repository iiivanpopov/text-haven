import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthResponse } from "@features/auth/types";
import { $axios } from "@shared/api";
import { removeAccessToken, removeSettings } from "@shared/lib/local-storage";

export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $axios.post<AuthResponse>("/logout");
      removeAccessToken();
      removeSettings();
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
