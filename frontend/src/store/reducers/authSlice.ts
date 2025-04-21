import { User } from "@models/User";
import { createSlice } from "@reduxjs/toolkit";
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
  user: User | undefined;
  accessToken: string;
}

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  error: "",
  accessToken: "",
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = "";
        state.isAuth = true;
        state.isLoading = false;

        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
        state.isLoading = false;
      })

      .addCase(registration.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registration.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = "";
        state.isAuth = true;
        state.isLoading = false;

        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(registration.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
        state.isLoading = false;
      })

      .addCase(refresh.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.error = "";
        state.isAuth = true;
        state.isLoading = false;

        localStorage.setItem("accessToken", action.payload.accessToken);
      })
      .addCase(refresh.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
        state.isLoading = false;

        localStorage.removeItem("accessToken");
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = undefined;
        state.error = "";
        state.isAuth = false;
        state.isLoading = false;

        localStorage.removeItem("accessToken");
      })
      .addCase(logout.rejected, (state, action) => {
        state.error = action.error.message || "Something went wrong";
        state.isLoading = false;
      });
  },
});

export default authSlice.reducer;
