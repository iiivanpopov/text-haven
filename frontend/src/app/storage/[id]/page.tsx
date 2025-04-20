"use client";

import Input from "@components/shared/Input";
import { use, useEffect, useMemo, useState } from "react";
import CreateNew from "../components/CreateNew";
import FileBtn from "../components/FileBtn";
import FolderBtn from "../components/FolderBtn";

type ShittyAPIResponse = {
  folders: {
    name: string;
    id: string;
  }[];
  files: {
    name: string;
    id: string;
  }[];
};

const fakeFileSystem: Record<
  string,
  {
    folders: { name: string; id: string }[];
    files: { name: string; id: string; content: string }[];
  }
> = {
  "": {
    folders: [
      { name: "Folder A", id: "a" },
      { name: "Folder B", id: "b" },
    ],
    files: [
      { name: "Root File 1", id: "root-file-1", content: "Content 1" },
      { name: "Root File 2", id: "root-file-2", content: "Content 2" },
    ],
  },
  a: {
    folders: [{ name: "Folder C", id: "c" }],
    files: [
      { name: "File 1", id: "file-1", content: "Content 1" },
      { name: "File 2", id: "file-2", content: "Content 2" },
    ],
  },
  b: {
    folders: [],
    files: [
      { name: "File 3", id: "file-3", content: "Content 3" },
      { name: "File 4", id: "file-4", content: "Content 4" },
    ],
  },
};

function escapeRegExp(string: string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function Storage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: folderId } = use(params);

  const [search, setSearch] = useState("");

  const [{ files, folders }, setData] = useState<ShittyAPIResponse>({
    folders: [],
    files: [],
  });

  useEffect(() => {
    setData(fakeFileSystem[folderId] ?? { folders: [], files: [] });
  }, [folderId]);

  const escapedSearch = useMemo(() => escapeRegExp(search), [search]);
  const regex = useMemo(() => new RegExp(escapedSearch, "i"), [escapedSearch]);

  const filteredFolders = useMemo(
    () => folders.filter((folder) => regex.test(folder.name)),
    [folders, regex],
  );

  const filteredFiles = useMemo(
    () => files.filter((file) => regex.test(file.name)),
    [files, regex],
  );

  return (
    <main className="mt-20 w-3/5 pb-40">
      <h3 className="mb-5 text-5xl flex flex-col text-gray-800 dark:text-gray-100">
        Storage
      </h3>
      <Input
        name="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
      />

      {filteredFolders.map((folder) => (
        <FolderBtn
          key={folder.id}
          folderId={folder.id}
          className="px-5"
          title={folder.name}
        />
      ))}

      {filteredFiles.map((file) => (
        <FileBtn
          key={file.id}
          className="px-5"
          fileId={file.id}
          title={file.name}
        />
      ))}

      <CreateNew />
    </main>
  );
}
