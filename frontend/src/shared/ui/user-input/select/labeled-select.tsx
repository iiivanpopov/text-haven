"use client";

import { useId } from "react";
import BaseSelect, {
  type BaseSelectProps,
} from "@shared/ui/user-input/select/base-select";

export type LabeledSelectProps = BaseSelectProps & {
  label?: string;
};

export default function LabeledSelect({ label, ...props }: LabeledSelectProps) {
  const id = useId();

  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={id}
          className="text-gray-800 dark:text-gray-100 text-md"
        >
          {label}
        </label>
      )}
      <BaseSelect
        {...props}
        id={id}
      />
    </div>
  );
}
