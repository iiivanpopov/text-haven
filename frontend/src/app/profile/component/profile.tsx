"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import Skeleton from "@/app/profile/component/skeleton";
import { fetchUser } from "@store/actions/userActions";
import Link from "next/link";

export default function Profile({ id }: { id?: string }) {
  const { user, isLoading, error } = useAppSelector(
    (state) => state.userReducer,
  );
  const { isAuth } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [isAuth]);

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return null;
  }

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
      {user.canEdit && (
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
