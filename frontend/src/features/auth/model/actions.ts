import { createAsyncThunk } from "@reduxjs/toolkit";
import { $axios } from "@shared/api";
import type { AuthResponse } from "@features/auth/types";
import { removeAccessToken } from "@shared/lib/local-storage";

export const logout = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $axios.post<AuthResponse>("/logout");
      removeAccessToken();
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
