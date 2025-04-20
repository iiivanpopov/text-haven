import { type User } from "@/models/User";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  user: (User & { canEdit: boolean }) | undefined;
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
  reducers: {
    userFetching: (state) => {
      state.isLoading = true;
    },
    userFetchingSuccess: (state, action) => {
      state.isLoading = false;
      state.error = "";
      state.user = action.payload;
    },
    userFetchingError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
