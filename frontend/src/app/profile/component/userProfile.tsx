import Link from "next/link";
import { memo } from "react";
import { User } from "@models/User";

function UserProfile({ user, canEdit }: { canEdit: boolean; user: User }) {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex gap-x-10">
        <div className="rounded-full min-w-[150px] min-h-[150px] size-[150px] bg-gray-300 dark:bg-gray-900"></div>
        <div className="flex flex-col justify-between">
          <h4 className="text-gray-800 dark:text-gray-100 text-2xl">
            {user.username}
          </h4>
          <span className="text-gray-700 dark:text-gray-200 text-xl">
            {user.email}
          </span>
          <span className="text-gray-400 dark:text-gray-500 text-sm">
            {user.exposure}
          </span>
        </div>
      </div>
      {canEdit && (
        <Link
          href="/profile/settings"
          aria-label="Go to profile settings"
          className="flex items-center justify-center transition-colors cursor-pointer bg-blue-400 dark:bg-blue-500 w-64 h-16 rounded-md text-3xl dark:hover:bg-blue-600 hover:bg-blue-500 text-gray-100"
        >
          Edit
        </Link>
      )}
    </div>
  );
}

export default memo(UserProfile);
