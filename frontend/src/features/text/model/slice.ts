import { Exposure, TextCategory } from "@shared/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const FileMode = {
  EDIT: "EDIT",
  VIEW: "VIEW",
} as const;
export type FileMode = (typeof FileMode)[keyof typeof FileMode];

interface FileState {
  mode: FileMode;
  text: {
    id: string;
    userId: string;
    createdAt: string | Date;
    name: string;
    content: string;
    exposure: Exposure;
    textCategory: TextCategory;
  };
  editableText: {
    name: string;
    content: string;
    exposure: Exposure;
    textCategory: TextCategory;
  };
}

const initialState: FileState = {
  mode: FileMode.VIEW,
  text: {
    id: "",
    userId: "",
    createdAt: "",
    name: "",
    content: "",
    exposure: Exposure.PRIVATE,
    textCategory: TextCategory.NOTE,
  },
  editableText: {
    name: "",
    content: "",
    exposure: Exposure.PRIVATE,
    textCategory: TextCategory.NOTE,
  },
};

const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<FileMode>) {
      state.mode = action.payload;
    },
    setFile(state, action: PayloadAction<FileState["text"]>) {
      state.text = action.payload;
      state.editableText = {
        name: action.payload.name,
        content: action.payload.content,
        exposure: action.payload.exposure,
        textCategory: action.payload.textCategory,
      };
    },
    setEditableName(state, action: PayloadAction<string>) {
      state.editableText.name = action.payload;
    },
    setEditableContent(state, action: PayloadAction<string>) {
      state.editableText.content = action.payload;
    },
    setEditableExposure(state, action: PayloadAction<Exposure>) {
      state.editableText.exposure = action.payload;
    },
    setEditableCategory(state, action: PayloadAction<TextCategory>) {
      state.editableText.textCategory = action.payload;
    },
  },
});

export const {
  setMode,
  setFile,
  setEditableName,
  setEditableContent,
  setEditableExposure,
  setEditableCategory,
} = fileSlice.actions;
export default fileSlice.reducer;
