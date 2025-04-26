import { File as Icon } from "lucide-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function File({
  className,
  name,
  id,
}: {
  id: string;
  className?: string;
  name: string;
}) {
  return (
    <Link
      href={`/text/${id}`}
      className={twMerge(
        "hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors flex items-center border-b-2 border-gray-300 dark:border-gray-700 text-xl text-gray-700 dark:text-gray-200 h-14",
        className,
      )}
    >
      <Icon size={32} className="text-blue-400 dark:text-blue-500" />
      <span className="pl-10">{name}</span>
    </Link>
  );
}
