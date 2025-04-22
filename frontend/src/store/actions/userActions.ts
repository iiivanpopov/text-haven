import $api from "@/api";
import { User } from "@models/User";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (id: string | undefined, { rejectWithValue }) => {
    try {
      const response = await $api.get<{ user: User & { canEdit: boolean } }>(
        `user${id ? "/" + id : ""}`,
      );
      return response.data.user;
    } catch (e) {
      return rejectWithValue(e.response.data.error ?? "Unknown error");
    }
  },
);
