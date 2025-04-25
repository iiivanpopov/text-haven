import EditForm from "@features/profile/ui/edit-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Edit | TextHaven",
  description: "Edit your account here",
};

export default function ProfileEdit() {
  return <EditForm />;
}
