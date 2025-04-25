"use client";

import { twMerge } from "tailwind-merge";
import { useAppSelector } from "@shared/hooks/redux";

export default function Preview() {
  const {
    text: { name, content },
  } = useAppSelector((state) => state.textReducer);

  return (
    <div className="flex flex-col">
      <h4 className={"text-gray-800 dark:text-gray-100 text-4xl"}>{name}</h4>
      <div
        className={twMerge(
          "text-md whitespace-pre-wrap overflow-auto h-[70vh] w-[1270px]",
          content
            ? "text-gray-700 dark:text-gray-200"
            : "text-gray-300 dark:text-gray-700",
        )}
      >
        {content ? content : "No content"}
      </div>
    </div>
  );
}
