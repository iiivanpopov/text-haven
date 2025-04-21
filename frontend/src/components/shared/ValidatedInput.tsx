import React from "react";
import { twMerge } from "tailwind-merge";

export default function ValidatedInput({
  className,
  name,
  error,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  error: string | null;
}) {
  return (
    <div className={"flex flex-col"}>
      <input
        {...props}
        placeholder={name || "Input"}
        className={twMerge(
          "h-10 rounded-md text-md text-gray-700 dark:text-gray-300 outline-none transition-colors",
          className,
        )}
      ></input>
      {error && (
        <span className={"text-red-400 dark:text-red-500"}>{error}</span>
      )}
    </div>
  );
}
