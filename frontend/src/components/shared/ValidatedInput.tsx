import React from "react";
import {
  DeepRequired,
  FieldError,
  FieldErrors,
  FieldValues,
} from "react-hook-form";
import { twMerge } from "tailwind-merge";

// TODO: pass error as string
type ValidatedInputProps<T extends FieldValues> =
  React.InputHTMLAttributes<HTMLInputElement> & {
    name: keyof T;
    errors: Partial<FieldErrors<DeepRequired<T>>>;
  };

export default function ValidatedInput<T extends FieldValues>({
  className,
  name,
  errors,
  ...props
}: ValidatedInputProps<T>) {
  const error = errors[name] as FieldError | undefined;

  return (
    <div className="flex flex-col">
      <input
        {...props}
        name={String(name)}
        placeholder={String(name) || "Input"}
        className={twMerge(
          "h-10 rounded-md text-md text-gray-700 dark:text-gray-300 outline-none transition-colors",
          className,
        )}
      />
      {error?.message && (
        <span className="text-red-400 dark:text-red-500">{error.message}</span>
      )}
    </div>
  );
}
