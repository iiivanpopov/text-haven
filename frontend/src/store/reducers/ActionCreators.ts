import axios from "axios";
import { User } from "@models/User";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk("user/fetch", async (_, thunkAPI) => {
  try {
    const response = await axios.get<User>(
      "https://jsonplaceholder.typicode.com/users",
    );
    return { ...response.data[0], exposure: "PUBLIC" };
  } catch (e) {
    return thunkAPI.rejectWithValue(e.message);
  }
});
