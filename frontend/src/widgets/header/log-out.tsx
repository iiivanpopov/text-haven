"use client";

import { LogOut } from "lucide-react";
import { memo } from "react";
import { twMerge } from "tailwind-merge";
import { logout } from "@features/auth/model/actions";
import { useAppDispatch } from "@shared/hooks/redux";

interface LogOutProps {
  className?: string;
  iconSize?: number | string;
}

const LogOutBtn = ({ iconSize = 32, className }: LogOutProps) => {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button
      className="group relative flex flex-col items-center bg-transparent outline-none border-none hover:cursor-pointer"
      onClick={handleLogout}
    >
      <LogOut
        size={iconSize}
        className={twMerge(
          "z-40 text-gray-800 dark:text-gray-100 transition-colors delay-75",
          className,
        )}
      />
      <span className="-z-10 w-16 absolute opacity-0 group-hover:opacity-100 group-hover:block group-hover:translate-y-10 text-md text-gray-800 dark:text-gray-100 transition-all delay-75">
        Log out
      </span>
    </button>
  );
};

export default memo(LogOutBtn);
