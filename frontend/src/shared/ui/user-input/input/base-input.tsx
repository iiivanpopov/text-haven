import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function BaseInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={twMerge(
        "h-10 rounded-md text-md text-gray-700 dark:text-gray-300 outline-none text-xl",
        className,
      )}
    />
  );
}
