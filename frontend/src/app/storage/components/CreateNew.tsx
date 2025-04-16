"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
export default function CreateNew() {
  // const [title, setTitle] = useState("");
  // const [content, setContent] = useState("");
  // const [exposure, setExposure] = useState<Exposure>("PRIVATE");
  // const [expiresIn, setExpiresIn] = useState<ExpiryOption>(0);

  // const handleCreate = () => {
  // console.log({ title, content, exposure, expiresIn });
  // };

  return (
    <Link
      href={`/storage/new`}
      className={twMerge(
        "hover:bg-gray-200 dark:hover:bg-gray-900 px-5 transition-colors flex items-center border-b-2 border-gray-300 dark:border-gray-700 text-xl text-gray-700 dark:text-gray-200 h-14",
      )}
    >
      <Plus size={32} className="dark:text-gray-200 text-gray-700" />
      <span className="pl-10">Add new</span>
    </Link>
  );
  {
  }
}
