import React, { HTMLInputTypeAttribute } from "react";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: HTMLInputTypeAttribute;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

export default function Input({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  ariaLabel,
  className,
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-label={ariaLabel || name}
      className={twMerge(
        "h-10 px-5 rounded-md text-md text-gray-700 dark:text-gray-300 outline-none transition-colors",
        className,
      )}
    />
  );
}
