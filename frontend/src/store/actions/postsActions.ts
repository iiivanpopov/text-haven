import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api";
import { Post } from "@models/Post";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<{ posts: Post[] }>("posts");
      return response.data.posts;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);
