import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/api";
import {
  Folder,
  setFilteredStorage,
  Storage,
} from "@store/slices/storageSlice";
import { AppDispatch, RootState } from "@store/store";

export const fetchStorage = createAsyncThunk(
  "storage/fetch",
  async (folderId: string | undefined, { rejectWithValue }) => {
    try {
      const response = await api.get<{ data: Storage }>(
        `storage${folderId ? `/${folderId}` : ""}`,
      );

      return response.data.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const createFolder = createAsyncThunk(
  "storage/create_folder",
  async (
    folder: Omit<Folder, "id" | "createdAt" | "userId">,
    { rejectWithValue },
  ) => {
    try {
      const response = await api.post("folders", { ...folder });
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  },
);

export const filterStorage =
  (regex: RegExp | null) =>
  (dispatch: AppDispatch, getState: () => RootState) => {
    const storage = getState().storageReducer.storage;

    if (!regex) return dispatch(setFilteredStorage(storage));

    const filteredStorage: Storage | Folder[] = Array.isArray(storage)
      ? storage.filter((folder) => regex.test(folder.name))
      : {
          ...storage,
          folders: Object.values(storage.folders).filter((folder) =>
            regex.test(folder.name),
          ),
          files: Object.values(storage.files).filter((file) =>
            regex.test(file.name),
          ),
        };

    dispatch(setFilteredStorage(filteredStorage));
  };
