import { TextType } from "@models/Settings";
import { Exposure } from "@models/User";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createFolder,
  fetchFile,
  fetchFolders,
  fetchStorage,
} from "@store/actions/storageActions";

export interface Folder {
  id: string;
  userId: string;
  parentId: string | undefined;
  name: string;
  exposure: Exposure;
  createdAt: string;
}

export interface File {
  id: string;
  userId: string;
  folderId: string;
  name: string;
  exposure: Exposure;
  expiresAt: Date | string;
  type: TextType;
  createdAt: string;
}

export type Storage = {
  id: string;
  name: string;
  folders: Folder[];
  files: File[];
};

interface StorageState {
  isLoading: boolean;
  error: string;
  storage: Storage | Folder[];
  allFolders: Folder[];
  currentFile: (File & { content: string }) | undefined;
  isRoot: boolean;
  filteredStorage: Storage | Folder[];
}

const initialState: StorageState = {
  error: "",
  isLoading: false,
  isRoot: true,
  storage: [],
  filteredStorage: [],
  currentFile: undefined,
  allFolders: [],
};

const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    setFilteredStorage: (state, action: PayloadAction<Storage | Folder[]>) => {
      state.filteredStorage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStorage.fulfilled, (state, action) => {
        state.storage = action.payload;
        state.filteredStorage = action.payload;
        state.error = "";
        state.isLoading = false;
        state.isRoot = Array.isArray(action.payload);
      })
      .addCase(fetchStorage.rejected, (state, action) => {
        state.error = action.error.message || "Unknown error";
        state.isLoading = false;
      })
      .addCase(fetchStorage.pending, (state) => {
        state.isLoading = true;
      })

      // TODO: update storage state after creating folder
      .addCase(createFolder.fulfilled, (state) => {
        state.error = "";
        state.isLoading = false;
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.error = action.error.message || "Unknown error";
        state.isLoading = false;
      })
      .addCase(createFolder.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.error = "";
        state.allFolders = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.error = action.error.message || "Unknown error";
        state.isLoading = false;
      })
      .addCase(fetchFolders.pending, (state) => {
        state.isLoading = true;
      })

      .addCase(fetchFile.fulfilled, (state, action) => {
        state.error = "";
        state.currentFile = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFile.rejected, (state, action) => {
        state.error = action.error.message || "Unknown error";
        state.isLoading = false;
      })
      .addCase(fetchFile.pending, (state) => {
        state.isLoading = true;
      });
  },
});

export default storageSlice.reducer;
export const { setFilteredStorage } = storageSlice.actions;
