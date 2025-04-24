import React, { TextareaHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export default function ValidatedTextarea({
  error,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error: string | undefined;
}) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.currentTarget;
      const { selectionStart, selectionEnd } = ta;

      ta.setRangeText("  ", selectionStart, selectionEnd, "end"); // insert \t

      const pos = selectionStart + 2;
      ta.selectionStart = ta.selectionEnd = pos; // move cursor

      const event = new InputEvent("input", { bubbles: true });
      ta.dispatchEvent(event); // bind target to event and send one
    }
  };

  return (
    <div className="flex flex-col">
      <textarea
        {...props}
        onKeyDown={handleKeyDown}
        className={twMerge(
          "h-10 rounded-md text-md text-gray-700 dark:text-gray-300 outline-none transition-colors",
          props.className,
        )}
      />
      <span className={"text-red-400 dark:text-red-500"}>{error}</span>
    </div>
  );
}
