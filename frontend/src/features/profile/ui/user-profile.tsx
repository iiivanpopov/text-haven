"use client";

import { useParams } from "next/navigation";
import { useGetUserQuery } from "@features/profile/model/api";
import UserCard from "@features/profile/ui/user-card";

export default function UserProfile() {
  const { id } = useParams<{ id: string | undefined }>();

  const { data, isLoading, isError } = useGetUserQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error loading profile</div>;

  return <UserCard user={data} />;
}
