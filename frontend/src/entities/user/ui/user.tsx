import { User } from "@entities/user/types";

export default function UserCard({ user }: { user: User }) {
  return (
    <div className="grid grid-cols-[144px_auto] gap-x-10 h-36">
      <div className="relative rounded-full size-36 bg-gray-300 dark:bg-gray-900 overflow-hidden" />
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
  );
}
