import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Text } from "@features/text/types";
import { fetchFile, updateFile } from "./actions";

type FileMode = "edit" | "read";

interface TextState {
  error: string;
  isLoading: boolean;
  mode: FileMode;
  text: Text;
}

const initialState: TextState = {
  error: "",
  isLoading: false,
  mode: "read",
  text: {
    content: "",
    id: "",
    name: "",
    userId: "",
    createdAt: "",
    exposure: "PRIVATE",
    type: "NOTE",
  },
};

const textSlice = createSlice({
  name: "text",
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.text.content = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.text.name = action.payload;
    },
    setMode: (state, action: PayloadAction<FileMode>) => {
      state.mode = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchFile.fulfilled, (state, action) => {
        state.text = action.payload;
        state.error = "";
        state.isLoading = false;
      })
      .addCase(fetchFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFile.rejected, (state, action) => {
        state.error = action.error.message ?? "Unknown error";
        state.isLoading = false;
      })

      .addCase(updateFile.fulfilled, (state, action) => {
        state.text = action.payload;
        state.error = "";
        state.isLoading = false;
      })
      .addCase(updateFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFile.rejected, (state, action) => {
        state.error = action.error.message ?? "Unknown error";
        state.isLoading = false;
      }),
});

export default textSlice.reducer;
export const { setContent, setName, setMode } = textSlice.actions;
