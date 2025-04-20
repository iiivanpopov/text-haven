import React, { memo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

type TextAreaProps = {
  className?: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
};

const TextArea = ({
  className,
  onChange,
  value,
  placeholder = "",
}: TextAreaProps) => {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState(value || "");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    onChange(e);
  };

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
    <textarea
      ref={ref}
      value={text}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className={twMerge("outline-none resize-none", className)}
    />
  );
};

export default memo(TextArea);
