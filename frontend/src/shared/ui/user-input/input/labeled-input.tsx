"use client";

import { type InputHTMLAttributes, useId } from "react";
import BaseInput from "@shared/ui/user-input/input/base-input";

export type LabeledInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export default function LabeledInput({ label, ...props }: LabeledInputProps) {
  const id = useId();

  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="text-gray-800 dark:text-gray-100 text-md"
      >
        {label}
      </label>
      <BaseInput
        {...props}
        id={id}
      />
    </div>
  );
}
