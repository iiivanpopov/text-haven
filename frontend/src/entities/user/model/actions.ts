import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AuthResponse } from "@features/auth/types";
import { $axios } from "@shared/api";

export const getUser = createAsyncThunk(
  "user/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $axios.get<AuthResponse>("/refresh");
      return response.data.data.user;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
