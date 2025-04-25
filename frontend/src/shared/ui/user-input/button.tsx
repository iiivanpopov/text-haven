import type { ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Button({
  className,
  children,
  name,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={twMerge(
        "inline-flex items-center justify-center gap-2 px-4 h-10 rounded-md text-md cursor-pointer transition-colors duration-300 select-none",
        "bg-gray-700 hover:bg-gray-800 dark:bg-gray-900 dark:hover:bg-gray-950 text-gray-100",
        className,
      )}
    >
      <span>{children ?? name}</span>
    </button>
  );
}
