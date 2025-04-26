import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "@entities/user/types";
import userApi from "@entities/user/model/api";
import { getUser } from "@entities/user/model/actions";

interface UserState {
  user: User | undefined;
}

const initialState: UserState = {
  user: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(userApi.endpoints.getUser.matchFulfilled, getUser.fulfilled),
      (state, action) => {
        state.user = action.payload;
      },
    );
  },
});

export default userSlice.reducer;
