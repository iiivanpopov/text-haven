"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { useCreateFolderMutation } from "@features/storage/model/api";
import Button from "@shared/ui/user-input/button";
import Input from "@shared/ui/user-input/input";

interface CreateNewProps {
  canCreateFile: boolean;
  currentFolderId: string | undefined;
}

export default function CreateNew({
  canCreateFile,
  currentFolderId,
}: CreateNewProps) {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");

  const [createFolder] = useCreateFolderMutation();

  const handleCancel = () => {
    setTitle("");
    setShowInput(false);
  };

  const handleSave = async () => {
    if (!title.trim()) return;
    await createFolder({
      name: title,
      parentId: currentFolderId ?? undefined,
      exposure: "PRIVATE",
    });

    setShowInput(false);
    setTitle("");
  };

  return (
    <div
      className={twMerge(
        "group relative flex items-center h-14 px-5 text-xl border-b-2 transition-colors",
        "text-gray-700 dark:text-gray-200",
        "border-gray-300 dark:border-gray-700",
        "hover:bg-gray-200 dark:hover:bg-gray-900",
      )}
    >
      <Plus size={32} className="text-gray-700 dark:text-gray-200" />
      <span className="pl-10">Add new</span>

      {!showInput && (
        <>
          <Button
            onClick={() => setShowInput(true)}
            className={twMerge(
              "absolute right-0 w-1/2 h-full flex items-center justify-center px-5 rounded-none",
              "bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-950 text-gray-700 dark:text-gray-200",
              "opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all",
            )}
            name="Create new folder"
            aria-label="Create new folder"
          />

          {canCreateFile && (
            <Link
              href="/text/new"
              className={twMerge(
                "absolute left-0 w-1/2 h-full flex items-center justify-center px-5",
                "bg-gray-200 hover:bg-gray-300 dark:bg-gray-900 dark:hover:bg-gray-950 text-gray-700 dark:text-gray-200",
                "opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all",
              )}
              aria-label="Create new file"
            >
              Create new file
            </Link>
          )}
        </>
      )}

      {showInput && (
        <div
          className="absolute inset-0 flex items-center justify-between px-5 bg-gray-200 dark:bg-gray-900 z-20"
          role="dialog"
          aria-modal
        >
          <Input
            className="w-full rounded-none bg-inherit"
            placeholder="Enter a new folder name"
            name="Input new folder name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="New folder name"
          />

          <div className="flex space-x-2 ml-4">
            <Button
              className="bg-red-400 hover:bg-red-500 text-white"
              name="Cancel"
              onClick={handleCancel}
              aria-label="Cancel"
            />

            <Button
              className="bg-green-400 hover:bg-green-500 text-white"
              name="Save"
              onClick={handleSave}
              aria-label="Save"
            />
          </div>
        </div>
      )}
    </div>
  );
}
