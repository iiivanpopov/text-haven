import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

interface NavItemProps {
  icon: LucideIcon;
  url: string;
  iconSize?: number | string;
  ariaLabel?: string;
  className?: string;
}

const NavItem = ({
  icon: Icon,
  url,
  iconSize = 32,
  ariaLabel,
  className,
}: NavItemProps) => (
  <Link
    className="group relative flex flex-col items-center"
    href={url}
    aria-label={ariaLabel}
  >
    <Icon
      className={twMerge(
        "z-40 text-gray-800 dark:text-gray-100 transition-colors delay-75",
        className,
      )}
      size={iconSize}
    />
    {ariaLabel && (
      <span className="-z-10 absolute opacity-0 group-hover:opacity-100 group-hover:block group-hover:translate-y-10 text-md text-gray-800 dark:text-gray-100 transition-all delay-75">
        {ariaLabel}
      </span>
    )}
  </Link>
);

export default memo(NavItem);
