"use client";

import { useGetUserQuery } from "@entities/user/model/api";
import UserCard from "@entities/user/ui/user";

export default function UserProfile() {
  const { data, isLoading, isError } = useGetUserQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading profile</div>;

  return <UserCard user={data} />;
}
