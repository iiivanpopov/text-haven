export const UserSkeleton = () => {
  return (
    <div className="animate-pulse grid grid-cols-[144px_auto] gap-x-10 h-36">
      <div className="relative rounded-full size-36 bg-gray-300 dark:bg-gray-900 overflow-hidden" />
      <div className="flex flex-col justify-between">
        <h4 className="text-gray-800 dark:text-gray-100 text-2xl">username</h4>
        <span className="text-gray-700 dark:text-gray-200 text-xl">
          user@gmail.com
        </span>
        <span className="text-gray-400 dark:text-gray-500 text-sm">
          PRIVATE
        </span>
      </div>
    </div>
  );
};
