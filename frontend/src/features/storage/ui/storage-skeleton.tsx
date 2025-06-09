import { StorageItemList } from "@features/storage/ui/storage-item-list";
import { ListItem } from "@features/storage/types";
import { FILE_ITEMS, FOLDER_ITEMS } from "@features/storage/constants";

export const StorageSkeleton = () => {
  return (
    <div className={"animate-pulse mt-20 w-3/5"}>
      <h3 className="mb-5 text-5xl text-gray-800 dark:text-gray-100">
        Storage
      </h3>

      <StorageItemList
        items={FOLDER_ITEMS}
        canDelete={false}
        type={ListItem.FOLDER}
        onDelete={() => {}}
      />

      <StorageItemList
        items={FILE_ITEMS}
        canDelete={false}
        type={ListItem.FILE}
        onDelete={() => {}}
      />
    </div>
  );
};
