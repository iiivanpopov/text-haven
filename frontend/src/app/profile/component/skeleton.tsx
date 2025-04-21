export default function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-x-5">
      <div className="flex gap-x-10">
        <div className="rounded-full min-w-[150px] min-h-[150px] size-[150px] bg-gray-300 dark:bg-gray-900"></div>
        <div className="flex flex-col justify-between">
          <h4 className="text-gray-800 dark:text-gray-100 text-2xl">
            Loading user
          </h4>
        </div>
      </div>
    </div>
  );
}
