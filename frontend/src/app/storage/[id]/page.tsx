// SOme mock data from api
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
      { name: "Root File 1", id: "a", content: "Content 1" },
      { name: "Root File 2", id: "b", content: "Content 1" },
    ],
  },
  a: {
    folders: [{ name: "Folder C", id: "c" }],
    files: [
      { name: "File 1", id: "File 1", content: "Content 1" },
      { name: "File 2", id: "File 2", content: "Content 1" },
    ],
  },
  b: {
    folders: [],
    files: [
      { name: "File 3", id: "File 3", content: "Content 1" },
      { name: "File 4", id: "File 4", content: "Content 1" },
    ],
  },
  c: {
    folders: [],
    files: [
      { name: "File 5", id: "File 5", content: "Content 1" },
      { name: "File 6", id: "File 6", content: "Content 1" },
    ],
  },
};

import { use } from "react";
import CreateNew from "../components/CreateNew";
import List from "../components/List";

export default function Storage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: folderId } = use(params);

  const data: {
    folders: { name: string; id: string }[];
    files: { name: string; id: string }[];
  } = fakeFileSystem[folderId] ?? { folders: [], files: [] };

  // FIXME: Not an efficient way(AT ALL). Maybe i should save it at state manager??(redux/mobx)
  const currentFolder = Object.values(fakeFileSystem)
    .map((value) => value.folders?.find((val) => val.id == folderId))
    .find((folder) => folder != undefined);

  return (
    <main className="mt-20 w-3/5 pb-40">
      <h3 className="mb-5 text-5xl flex flex-col text-gray-800 dark:text-gray-100">
        <span className="mb-10">
          Storage {currentFolder?.name ? `| ${currentFolder.name}` : null}
        </span>
        <List data={data} />
        <CreateNew />
      </h3>
    </main>
  );
}
