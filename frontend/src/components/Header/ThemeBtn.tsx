"use client";

import { Moon, Sun } from "lucide-react";
import { memo, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { toggleTheme } from "@store/actions/settingsActions";

function ThemeButton({ className }: { className?: string }) {
  const { theme } = useAppSelector((state) => state.settingsSlice.settings);
  const dispatch = useAppDispatch();
  const [mounted, setMounted] = useState(false);

  const Icon = theme === "light" ? Sun : Moon;

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <button
        aria-label="Switch theme"
        onClick={() => dispatch(toggleTheme())}
        className={twMerge(
          "z-0 cursor-pointer relative flex flex-col items-center text-gray-800 dark:text-gray-100 transition-colors duration-300",
          className,
        )}
      >
        <Icon
          size={32}
          className="peer z-40 transition-colors duration-300 delay-75"
        />
        <span className="z-30 absolute opacity-0 peer-hover:opacity-100 peer-hover:block peer-hover:translate-y-10 text-md transition-all delay-75 text-nowrap text-gray-800 dark:text-gray-100">
          Switch theme
        </span>
      </button>
    )
  );
}

export default memo(ThemeButton);
