import { Post } from "@models/Post";
import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "@store/actions/postsActions";

interface PostsState {
  posts: Post[];
  isLoading: boolean;
  error: string;
}

const initialState: PostsState = {
  posts: [],
  isLoading: false,
  error: "",
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.error = "";
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.error = "";
        state.isLoading = false;
      });
  },
});

export default postsSlice.reducer;
