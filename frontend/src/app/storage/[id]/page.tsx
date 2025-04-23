"use client";

import { use, useEffect, useRef, useState } from "react";
import Input from "@components/shared/Input";
import CreateNew from "../components/CreateNew";
import FileBtn from "../components/FileBtn";
import FolderBtn from "../components/FolderBtn";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { fetchStorage, filterStorage } from "@store/actions/storageActions";
import type { Folder, Storage } from "@store/slices/storageSlice";

type StorageProps = {
  params: Promise<{ id: string | undefined }>;
};

export default function Storage({ params }: StorageProps) {
  const { id: folderId } = use(params);
  const dispatch = useAppDispatch();
  const didMount = useRef(false);

  const [search, setSearch] = useState("");
  const { filteredStorage, isLoading, error, isRoot } = useAppSelector(
    (state) => state.storageReducer,
  );

  useEffect(() => {
    dispatch(fetchStorage(folderId));
  }, [folderId]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    if (search.trim() === "") {
      dispatch(filterStorage(null));
      return;
    }

    const regex = new RegExp(search, "idu");
    dispatch(filterStorage(regex));
  }, [search, dispatch]);

  if (error) return <div>{error}</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <main className="mt-20 w-3/5 pb-40">
      <h3 className="mb-5 text-5xl flex flex-col text-gray-800 dark:text-gray-100">
        Storage {isRoot ? "Root" : (filteredStorage as Storage).name}
      </h3>

      <Input
        name="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />

      <CreateNew canCreateFile={!isRoot} />

      {(isRoot
        ? (filteredStorage as Folder[])
        : (filteredStorage as Storage).folders
      ).map((folder) => (
        <FolderBtn
          key={folder.id}
          folderId={folder.id}
          className="px-5"
          title={folder.name}
        />
      ))}

      {!isRoot &&
        (filteredStorage as Storage).files.map((file) => (
          <FileBtn
            key={file.id}
            fileId={file.id}
            className="px-5"
            title={file.name}
          />
        ))}
    </main>
  );
}
