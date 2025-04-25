import type { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Submit({
  className,
  ...props
}: HTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      type={"submit"}
      className={twMerge(
        "text-gray-200 inline-flex items-center justify-center gap-2 px-4 h-10 rounded-md text-md cursor-pointer transition-colors duration-300 select-none bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-600",
        className,
      )}
    />
  );
}
