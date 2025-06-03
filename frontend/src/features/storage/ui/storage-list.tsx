import { ListItem, type StorageListElement } from "@features/storage/types";
import { StorageItemList } from "@features/storage/ui/storage-item-list";

interface ItemListSectionProps {
  files: StorageListElement[];
  folders: StorageListElement[];
  canDelete: boolean;
  handleDelete: (id: string, type: ListItem) => void;
}

export const StorageList = ({
  files,
  folders,
  canDelete,
  handleDelete,
}: ItemListSectionProps) => {
  return (
    <>
      {folders.length > 0 && (
        <StorageItemList
          items={folders}
          canDelete={canDelete}
          type={ListItem.FOLDER}
          onDelete={handleDelete}
        />
      )}

      {files.length > 0 && (
        <StorageItemList
          items={files}
          canDelete={canDelete}
          type={ListItem.FILE}
          onDelete={handleDelete}
        />
      )}
    </>
  );
};
