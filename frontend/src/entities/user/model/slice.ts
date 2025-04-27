import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "@entities/user/model/actions";
import { User } from "@entities/user/types";

interface UserState {
  user: User | undefined;
  isAuth: boolean;
  isError: boolean;
  isLoading: boolean;
}

const initialState: UserState = {
  user: undefined,
  isAuth: false,
  isError: false,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.rejected, (state) => {
        state.isAuth = false;
        state.isError = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default userSlice.reducer;
