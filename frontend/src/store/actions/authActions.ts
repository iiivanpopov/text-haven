import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthResponse } from "@/api/types";
import { publicApi } from "@/api";

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await publicApi.post<AuthResponse>(
        "login",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data.error ?? "Unknown error");
    }
  },
);

export const registration = createAsyncThunk(
  "auth/register",
  async (
    {
      email,
      password,
      username,
    }: { email: string; username: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await publicApi.post<AuthResponse>(
        `register`,
        { email, password, username },
        { withCredentials: true },
      );

      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data.error ?? "Unknown error");
    }
  },
);

export const refresh = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.get<AuthResponse>(`refresh`, {
        withCredentials: true,
      });

      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data;
    } catch (e) {
      localStorage.removeItem("accessToken");
      return rejectWithValue(e.response.data.error ?? "Unknown error");
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await publicApi.post<AuthResponse>(`logout`, null, {
        withCredentials: true,
      });

      localStorage.removeItem("accessToken");
      return response.data;
    } catch (e) {
      localStorage.removeItem("accessToken");
      return rejectWithValue(e.response.data.error ?? "Unknown error");
    }
  },
);
