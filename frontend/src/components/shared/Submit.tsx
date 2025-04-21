import React from "react";

export default function Submit({
  ...props
}: React.HTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      type={"submit"}
      className="text-gray-200 inline-flex items-center justify-center gap-2 px-4 h-10 rounded-md text-md cursor-pointer transition-colors duration-300 select-none bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-600"
    />
  );
}
