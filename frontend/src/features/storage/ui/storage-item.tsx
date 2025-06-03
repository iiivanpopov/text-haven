import { FileIcon, FolderIcon, TrashIcon } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { ListItem } from "@features/storage/types";

type ItemProps = {
  type: ListItem;
  id: string;
  canDelete: boolean;
  name: string;
  onDelete?: (id: string, type: ListItem) => void;
};

export const StorageItem = ({
  type,
  canDelete,
  id,
  name,
  onDelete,
}: ItemProps) => {
  const Icon = type === ListItem.FILE ? FileIcon : FolderIcon;

  const handleDelete = () => {
    if (onDelete) onDelete(id, type);
  };

  return (
    <div
      className={twMerge(
        "flex items-center px-5",
        canDelete ? "justify-between" : "justify-start",
        "border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors border-b-2",
      )}
    >
      <Link
        href={`/${type === ListItem.FILE ? "text" : "storage"}/${id}`}
        className="transition-colors flex items-center text-xl text-gray-700 dark:text-gray-200 h-14"
      >
        <Icon
          size={32}
          className="text-gray-700 dark:text-gray-200"
        />
        <span className="pl-10">{name}</span>
      </Link>

      {canDelete && (
        <button
          onClick={handleDelete}
          aria-label={`Delete ${type.toLowerCase()} ${name}`}
        >
          <TrashIcon
            size={32}
            className="text-red-400 hover:text-red-500 dark:text-red-500 dark:hover:text-red-600 transition-colors cursor-pointer"
          />
        </button>
      )}
    </div>
  );
};
