"use client";

import { Moon, Sun } from "lucide-react";
import { memo, useEffect, useMemo } from "react";
import { twMerge } from "tailwind-merge";
import { setTheme } from "@entities/settings/model/slice";
import { useAppDispatch, useAppSelector } from "@shared/hooks/redux";
import { setLocalSettings } from "@shared/lib/local-storage";
import { applyTheme } from "@shared/lib/theme";
import { Theme } from "@shared/types";

function ThemeBtn({ className }: { className: string }) {
  const {
    settings: { theme, ...settings },
  } = useAppSelector((state) => state.settingsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const handleTheme = () => {
    if (!theme) return;
    setLocalSettings({
      ...settings,
      theme: theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
    });

    dispatch(setTheme(theme == Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  };

  const Icon = useMemo(() => (theme == Theme.LIGHT ? Sun : Moon), [theme]);

  return (
    <button
      aria-label="Switch theme"
      title="Switch theme"
      role="switch"
      aria-checked={theme === Theme.DARK}
      onClick={handleTheme}
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

export default memo(ThemeBtn);
