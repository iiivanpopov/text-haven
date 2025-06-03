"use client";

import { useParams } from "next/navigation";
import { useGetUserQuery } from "@features/profile/model/api";
import {
  useCreateFolderMutation,
  useDeleteFileMutation,
  useDeleteFolderMutation,
  useGetStorageQuery,
} from "@features/storage/model/api";
import { type Folder, ListItem } from "@features/storage/types";
import { StorageList } from "@features/storage/ui/storage-list";
import { useStorage } from "@shared/hooks/storage";
import { isIdStorage } from "@shared/lib/type-guards";
import CreateNew from "./create-new";

export default function Directory() {
  const { id } = useParams<{ id?: string }>();
  const { data: storageData, isLoading, isError } = useGetStorageQuery(id);
  const { data: userData } = useGetUserQuery(storageData?.user.id ?? "", {
    skip: !storageData?.user.id,
  });

  const [deleteFolder] = useDeleteFolderMutation();
  const [deleteFile] = useDeleteFileMutation();
  const [createFolder] = useCreateFolderMutation();

  const { folders, files, removeFile, removeFolder, addFolder } =
    useStorage(storageData);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !storageData || !userData) return <div>Missing data</div>;

  const { isRoot, user: owner } = storageData;
  const canDelete = userData.id === owner.id;

  const handleDelete = async (id: string, type: ListItem) => {
    if (type === ListItem.FOLDER) {
      await deleteFolder(id);
      removeFolder(id);
    } else if (type === ListItem.FILE) {
      await deleteFile(id);
      removeFile(id);
    }
  };

  const handleCreateFolder = async (
    folder: Omit<Folder, "id" | "userId" | "createdAt">,
  ) => {
    const response = await createFolder(folder);

    const createdFolder = response?.data;
    if (createdFolder) {
      const { id, name } = createdFolder;
      if (id && name) addFolder({ id, name });
    }
  };

  const isStorage = isIdStorage(storageData);
  const currentFolderId = !isRoot && isStorage ? storageData.id : undefined;

  return (
    <main className="mt-20 w-3/5 pb-40">
      <h3 className="mb-5 text-5xl text-gray-800 dark:text-gray-100">
        Storage
        {isRoot ? " root" : ` ${isStorage ? storageData.name : ""}`}
      </h3>
      <CreateNew
        canCreateFile={!isRoot}
        currentFolderId={currentFolderId}
        onCreateFolderAction={handleCreateFolder}
      />
      `
      <StorageList
        files={files}
        folders={folders}
        canDelete={canDelete}
        handleDelete={handleDelete}
      />
    </main>
  );
}
