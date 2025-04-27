"use client";

import { useParams } from "next/navigation";
import { useGetStorageQuery } from "@features/storage/model/api";
import ItemList from "@features/storage/ui/item-list";
import File from "@entities/storage/ui/file";
import Folder from "@entities/storage/ui/folder";
import CreateNew from "./create-new";

export default function Directory() {
  const { id } = useParams<{ id: string | undefined }>();

  const { data, isLoading, isError } = useGetStorageQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data) {
    return <div>Error loading storage</div>;
  }

  const { isRoot } = data;
  const folders = isRoot ? data.data : data.data.folders;
  const files = isRoot ? [] : data.data.files;

  return (
    <main className="mt-20 w-3/5 pb-40">
      <h3 className="mb-5 text-5xl text-gray-800 dark:text-gray-100">
        Storage {isRoot ? "root" : data.data.name}
      </h3>

      <CreateNew
        canCreateFile={!isRoot}
        currentFolderId={isRoot ? undefined : data.data.id}
      />

      {folders && <ItemList items={folders} Component={Folder} />}
      {files && <ItemList items={files} Component={File} />}
    </main>
  );
}
