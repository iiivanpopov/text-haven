"use client";

import { useEffect } from "react";
import { fetchUser } from "@store/reducers/ActionCreators";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import UserData from "@/app/profile/component/userProfile";
import Skeleton from "@/app/profile/component/skeleton";

export default function Profile() {
  const { user, isLoading, error } = useAppSelector(
    (state) => state.userReducer,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>User not found.</div>;
  }

  return <UserData user={user} />;
}
