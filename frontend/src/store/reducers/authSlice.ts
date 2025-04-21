import { User } from "@models/User";
import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import {
  login,
  logout,
  refresh,
  registration,
} from "@store/actions/authActions";

interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
  error: string;
  user: User | null;
  accessToken: string;
}

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  error: "",
  accessToken: "",
  user: null,
};

const handlePending = (state: AuthState) => {
  state.isLoading = true;
};

const handleRejected = (state: AuthState, action: any) => {
  state.error = action.error.message || "Something went wrong";
  state.isLoading = false;
};

const handleAuthFulfilled = (
  state: AuthState,
  action: PayloadAction<{ user: User; accessToken: string }>,
) => {
  state.user = action.payload.user;
  state.error = "";
  state.isAuth = true;
  state.isLoading = false;
  state.accessToken = action.payload.accessToken;
};

const handleLogoutFulfilled = (state: AuthState) => {
  state.user = null;
  state.error = "";
  state.isAuth = false;
  state.isLoading = false;
  state.accessToken = "";
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, handleAuthFulfilled)
      .addCase(registration.fulfilled, handleAuthFulfilled)
      .addCase(refresh.fulfilled, handleAuthFulfilled)
      .addCase(logout.fulfilled, handleLogoutFulfilled)
      .addMatcher(
        isAnyOf(
          login.pending,
          registration.pending,
          refresh.pending,
          logout.pending,
        ),
        handlePending,
      )
      .addMatcher(
        isAnyOf(
          login.rejected,
          registration.rejected,
          refresh.rejected,
          logout.rejected,
        ),
        handleRejected,
      );
  },
});

export default authSlice.reducer;
