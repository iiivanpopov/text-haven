"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import UserProfile from "@/app/profile/component/userProfile";
import Skeleton from "@/app/profile/component/skeleton";
import { fetchUser } from "@store/reducers/ActionCreators";

export default function Profile({ id }: { id?: string }) {
  const { user, isLoading, error } = useAppSelector(
    (state) => state.userReducer,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser(id));
  }, []);

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return null;
  }

  return <UserProfile user={user} canEdit={user.canEdit} />;
}
