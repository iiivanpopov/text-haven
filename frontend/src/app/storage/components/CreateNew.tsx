"use client";

import Button from "@components/shared/Button";
import Input from "@components/shared/Input";
import { Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

export default function CreateNew({
  canCreateFile,
}: {
  canCreateFile: boolean;
}) {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");

  const handleCancel = () => {
    setTitle("");
    setShowInput(false);
  };

  const handleSave = () => {
    if (!title) {
      return;
    }
    console.log("Saving folder:", title);
    setShowInput(false);
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

      <Button
        onClick={() => setShowInput(true)}
        className={twMerge(
          "absolute right-0 w-1/2 h-full flex items-center justify-center px-5 rounded-none",
          "bg-gray-200 hover:bg-gray-300 dark:hover:bg-gray-950 text-gray-700 dark:text-gray-200",
          "opacity-0 group-hover:opacity-100 focus:opacity-100 transition-all",
        )}
        name="Create new folder"
        ariaLabel="Create new folder"
      />

      {canCreateFile && (
        <Link
          href="/storage/new"
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

      {showInput && (
        <>
          <Input
            className="bg-gray-200 dark:bg-gray-900 z-20 absolute h-full w-full left-0 rounded-none"
            placeholder="Enter a new folder name"
            name="Input new folder name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            ariaLabel="New folder name"
          />

          <div className="absolute right-0 z-30 flex space-x-2 mr-5">
            <Button
              className="bg-red-400 hover:bg-red-500 text-white"
              name="Cancel"
              onClick={handleCancel}
              ariaLabel="Cancel"
            />

            <Button
              className="bg-green-400 hover:bg-green-500 text-white"
              name="Save"
              onClick={handleSave}
              ariaLabel="Save"
            />
          </div>
        </>
      )}
    </div>
  );
}
