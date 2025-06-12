"use client";

import { useParams } from "next/navigation";
import { useGetUserQuery } from "@features/profile/model/api";
import UserCard from "@features/profile/ui/user-card";
import { UserSkeleton } from "@features/profile/ui/user-skeleton";

export default function UserProfile() {
  const { id } = useParams<{ id: string | undefined }>();

  const { data, isLoading, isError } = useGetUserQuery(id);
  const userData = data?.data;

  if (isLoading) return <UserSkeleton />;
  if (isError || !userData) return <div>Error loading profile</div>;

  return <UserCard user={userData} />;
}
