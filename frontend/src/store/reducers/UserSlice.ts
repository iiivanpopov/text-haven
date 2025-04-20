import { type User } from "@/models/User";
import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "@store/reducers/ActionCreators";

interface UserState {
  user: User | undefined;
  isLoading: boolean;
  error: string;
}

const initialState: UserState = {
  user: undefined,
  isLoading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
