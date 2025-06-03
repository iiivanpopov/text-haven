import { twMerge } from "tailwind-merge";
import type { FileData } from "@features/text/model/api";

export default function Preview({ data }: { data: FileData }) {
  return (
    <div className="flex flex-col">
      <h4 className={"text-gray-800 dark:text-gray-100 text-4xl"}>
        {data.meta.name}
      </h4>
      <div
        className={twMerge(
          "text-md whitespace-pre-wrap overflow-auto h-[70vh] w-[1270px]",
          data.content
            ? "text-gray-700 dark:text-gray-200"
            : "text-gray-300 dark:text-gray-700",
        )}
      >
        {data.content.content ? data.content.content : "No content"}
      </div>
    </div>
  );
}
