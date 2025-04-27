import { createAsyncThunk } from "@reduxjs/toolkit";
import type { Text } from "@features/text/types";
import { $axios } from "@shared/api";
import type { ApiResponse } from "@shared/types";

export const fetchFile = createAsyncThunk(
  "text/fetch",
  async (id: string, { rejectWithValue }) => {
    try {
      const metadata = await $axios.get<ApiResponse<Text>>(
        `/files?fileId=${id}`,
      );
      const content = await $axios.get<ApiResponse<{ content: string }>>(
        `/files/${id}/content`,
      );
      return { ...metadata.data.data, content: content.data.data.content };
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const updateFile = createAsyncThunk(
  "text/update",
  async (
    {
      id,
      content,
      meta,
    }: {
      id: string;
      content: string;
      meta: Partial<Omit<Text, "id" | "createdAt">>;
    },
    { rejectWithValue },
  ) => {
    try {
      const metadata = await $axios.patch<ApiResponse<Text>>(
        `/files/${id}`,
        meta,
      );
      await $axios.patch<ApiResponse<Text>>(`/files/${id}/content`, {
        content,
      });
      return {
        ...metadata.data.data,
        content,
      };
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
