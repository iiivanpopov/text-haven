import type { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

export default function Input({
  className,
  name,
  error,
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col">
      <input
        {...props}
        name={name}
        placeholder={name || "Input"}
        className={twMerge(
          "h-10 rounded-md text-md text-gray-700 dark:text-gray-300 outline-none transition-colors text-xl",
          className,
        )}
      />
      <span className="text-red-400 dark:text-red-500">{error}</span>
    </div>
  );
}
