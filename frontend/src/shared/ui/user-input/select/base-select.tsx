import type { SelectHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export type BaseSelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: { value: string | number; name: string }[];
};

export default function BaseSelect({
  className,
  options,
  ...props
}: BaseSelectProps) {
  return (
    <select
      {...props}
      className={twMerge(
        "bg-gray-100 dark:bg-gray-950 h-10 rounded-md text-md text-gray-700 dark:text-gray-300 outline-none transition-colors duration-300 cursor-pointer",
        className,
      )}
    >
      {options.map(({ name, value }) => (
        <option
          key={value}
          value={String(value)}
          className="bg-inherit text-inherit"
        >
          {name}
        </option>
      ))}
    </select>
  );
}
