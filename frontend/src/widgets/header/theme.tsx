"use client";

import { Moon, Sun } from "lucide-react";
import { memo, useMemo } from "react";
import { twMerge } from "tailwind-merge";

const theme = "light";

function Theme({ className }: { className: string }) {
  const Icon = useMemo(() => (theme === "light" ? Sun : Moon), [theme]);

  return (
    <button
      aria-label="Switch theme"
      title="Switch theme"
      role="switch"
      onClick={() => {}}
      className={twMerge(
        "group relative flex flex-col items-center text-gray-800 dark:text-gray-100 transition-colors duration-300",
        "cursor-pointer",
        className,
      )}
    >
      <Icon
        size={32}
        className="z-40 transition-colors duration-300 delay-75 group-hover:text-blue-500"
      />
      <span className="-z-10 absolute opacity-0 group-hover:opacity-100 group-hover:translate-y-10 text-md transition-all delay-75 whitespace-nowrap text-gray-800 dark:text-gray-100">
        Switch theme
      </span>
    </button>
  );
}

export default memo(Theme);
