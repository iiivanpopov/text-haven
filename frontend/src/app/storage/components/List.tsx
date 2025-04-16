import FolderBtn from "./FolderBtn";
import FileBtn from "./FileBtn";
import { memo } from "react";

function List({
  data,
}: {
  data: {
    folders: { id: string; name: string }[];
    files: { id: string; name: string }[];
  };
}) {
  return (
    <>
      {data.folders.map((folder) => (
        <FolderBtn
          key={folder.id}
          folderId={folder.id}
          className="px-5"
          title={folder.name}
        />
      ))}

      {data.files.map((file) => (
        <FileBtn
          key={file.id}
          className="px-5"
          fileId={file.id}
          title={file.name}
        />
      ))}
    </>
  );
}

export default memo(List);
