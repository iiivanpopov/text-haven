"use client";

import { Moon, Sun } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { parseSettings, toggleTheme } from "@store/actions/settingsActions";

type Props = {
  className?: string;
};

function ThemeButton({ className }: Props) {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.settingsReducer.settings.theme);
  const [mounted, setMounted] = useState(false);

  const Icon = useMemo(() => (theme === "light" ? Sun : Moon), [theme]);

  useEffect(() => {
    dispatch(parseSettings());
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      aria-label="Switch theme"
      title="Switch theme"
      role="switch"
      aria-checked={theme === "dark"}
      onClick={() => dispatch(toggleTheme())}
      className={twMerge(
        "relative flex flex-col items-center text-gray-800 dark:text-gray-100 transition-colors duration-300",
        "cursor-pointer focus:outline-none",
        className,
      )}
    >
      <Icon
        size={32}
        className="peer z-40 transition-colors duration-300 delay-75"
      />
      <span className="z-30 absolute opacity-0 peer-hover:opacity-100 peer-hover:block peer-hover:translate-y-10 text-md transition-all delay-75 whitespace-nowrap text-gray-800 dark:text-gray-100">
        Switch theme
      </span>
    </button>
  );
}

export default memo(ThemeButton);
