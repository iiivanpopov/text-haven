import type { Metadata } from "next";
import EditForm from "@features/profile/ui/edit-form";

export const metadata: Metadata = {
  title: "Profile Edit | TextHaven",
  description: "Edit your account here",
};

export default function ProfileEditPage() {
  return <EditForm />;
}
