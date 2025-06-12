import type { Metadata } from "next";
import UserEditForm from "@features/profile/ui/user-edit-form";

export const metadata: Metadata = {
  title: "Profile Edit | TextHaven",
  description: "Edit your account here",
};

export default function ProfileEditPage() {
  return <UserEditForm />;
}
