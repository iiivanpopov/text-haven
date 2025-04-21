"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import UserProfile from "@/app/profile/component/userProfile";
import Skeleton from "@/app/profile/component/skeleton";
import { fetchUser } from "@store/actions/userActions";

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

  return <UserProfile user={user} />;
}
