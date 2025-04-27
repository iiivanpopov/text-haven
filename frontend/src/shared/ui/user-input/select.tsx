import type { SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function Select({
  name,
  error,
  className,
  options,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  options: { value: string | number; name: string }[];
  error?: string;
}) {
  return (
    <div className={"flex flex-col"}>
      <select
        {...props}
        className={twMerge(
          "px-5 bg-gray-100 dark:bg-gray-950 h-10 rounded-md text-md text-gray-700 dark:text-gray-300 outline-none transition-colors duration-300 cursor-pointer",
          className,
        )}
      >
        {options.map(({ name, value }) => (
          <option
            key={value}
            value={String(value)}
            className={"bg-inherit text-inherit"}
          >
            {name}
          </option>
        ))}
      </select>
      <span className={"text-red-400 dark:text-red-500"}>{error}</span>
    </div>
  );
}
