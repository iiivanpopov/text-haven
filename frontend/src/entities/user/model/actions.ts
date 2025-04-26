import { createAsyncThunk } from "@reduxjs/toolkit";
import { $axios } from "@shared/api";
import type { ApiResponse } from "@shared/types";
import type { User } from "@entities/user/types";

export const getUser = createAsyncThunk(
  "user/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $axios.get<ApiResponse<User>>("/user");
      return response.data.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
