import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthResponse } from "@/api/types";
import $api from "@/api";

export const login = createAsyncThunk(
  "auth/login",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post<AuthResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
        { email, password },
        { withCredentials: true },
      );

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
      const response = await axios.post<AuthResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/register`,
        { email, password, username },
        { withCredentials: true },
      );

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
      const response = await axios.get<AuthResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/refresh`,
        { withCredentials: true },
      );

      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data.error ?? "Unknown error");
    }
  },
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await $api.post<AuthResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/logout`,
      );

      return response.data;
    } catch (e) {
      return rejectWithValue(e.response.data.error ?? "Unknown error");
    }
  },
);
