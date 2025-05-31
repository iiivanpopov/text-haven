import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Text } from "@features/text/types";
import { Exposure, TextCategory } from "@shared/types";
import { fetchFile, updateFile } from "./actions";

export const FileMode = {
  EDIT: "EDIT",
  READ: "READ",
} as const;
export type FileMode = (typeof FileMode)[keyof typeof FileMode];

interface TextState {
  error: string;
  isLoading: boolean;
  mode: FileMode;
  text: Text;
}

const initialState: TextState = {
  error: "",
  isLoading: false,
  mode: FileMode.READ,
  text: {
    content: "",
    id: "",
    name: "",
    userId: "",
    createdAt: "",
    exposure: Exposure.PRIVATE,
    textCategory: TextCategory.NOTE,
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
