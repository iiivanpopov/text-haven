import { twMerge } from "tailwind-merge";

export default function Content({
  children,
}: {
  children: string | undefined;
}) {
  return (
    <div
      className={twMerge(
        "text-md whitespace-pre-wrap overflow-auto h-[70vh] w-[1270px]",
        children
          ? "text-gray-700 dark:text-gray-200"
          : "text-gray-300 dark:text-gray-700",
      )}
    >
      {children ? children : "No content"}
    </div>
  );
}
