import { twMerge } from "tailwind-merge";
import React from "react";

interface Option {
  name: string;
  value: string;
}

interface SelectProps {
  value: string;
  name: string;
  options: Option[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

export default function Select({
  value,
  name,
  options,
  onChange,
  placeholder,
  ariaLabel,
  className,
}: SelectProps) {
  return (
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      aria-label={ariaLabel || name}
      className={twMerge(
        "px-5 bg-gray-100 dark:bg-gray-950 h-10 rounded-md text-md text-gray-700 dark:text-gray-300 outline-none transition-colors duration-300 cursor-pointer",
        className,
      )}
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}

      {options.map(({ name, value }) => (
        <option className="bg-inherit text-inherit" key={value} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
}
