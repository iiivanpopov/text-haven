import React, { SelectHTMLAttributes } from "react";
import { DeepRequired, FieldErrors, FieldValues } from "react-hook-form";

type ValidatedSelectType<T extends FieldValues> =
  SelectHTMLAttributes<HTMLSelectElement> & {
    name: keyof T;
    options: { value: string; name: string }[];
    errors: Partial<FieldErrors<DeepRequired<T>>>;
  };

export default function ValidatedSelect<T extends FieldValues>({
  name,
  errors,
  className,
  options,
  ...props
}: ValidatedSelectType<T>) {
  const error = errors[name] as FieldValues | undefined;
  return (
    <div className={"flex flex-col"}>
      <select
        {...props}
        className={
          "px-5 bg-gray-100 dark:bg-gray-950 h-10 rounded-md text-md text-gray-700 dark:text-gray-300 outline-none transition-colors duration-300 cursor-pointer"
        }
      >
        {options.map(({ name, value }) => (
          <option
            key={value}
            value={value}
            className={"bg-inherit text-inherit"}
          >
            {name}
          </option>
        ))}
      </select>
      <span className={"text-red-400 dark:text-red-500"}>
        {error?.message && error.message}
      </span>
    </div>
  );
}
