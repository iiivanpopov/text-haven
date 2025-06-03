import { useEffect, useState } from "react";
import { Storage, StorageListElement } from "@features/storage/types";

export const useStorage = (initialValue?: Storage) => {
  const [folders, setFolders] = useState<StorageListElement[]>([]);
  const [files, setFiles] = useState<StorageListElement[]>([]);

  useEffect(() => {
    setFolders(initialValue?.folders ?? []);
    setFiles(initialValue?.files ?? []);
  }, [initialValue]);

  const removeFolder = (filter: string) => {
    setFolders((prev) => prev.filter((item) => item.id !== filter));
  };

  const removeFile = (filter: string) => {
    setFiles((prev) => prev.filter((item) => item.id !== filter));
  };

  const addFolder = (folder: StorageListElement) => {
    setFolders((prev) => [...prev, folder]);
  };

  return { folders, files, removeFolder, removeFile, addFolder };
};
