import { ListItem, type StorageListElement } from "@features/storage/types";
import { StorageItem } from "@features/storage/ui/storage-item";
import { ItemList } from "@shared/ui/item-list";

interface Props {
  items: StorageListElement[];
  type: ListItem;
  canDelete: boolean;
  onDelete: (id: string, type: ListItem) => void;
}

export function StorageItemList({ items, type, canDelete, onDelete }: Props) {
  if (items.length === 0) return null;

  const extendedItems = items.map((item) => ({
    ...item,
    type,
    canDelete,
    onDelete,
  }));

  return (
    <ItemList
      items={extendedItems}
      Component={StorageItem}
      getKey={(item) => item.id}
    />
  );
}
