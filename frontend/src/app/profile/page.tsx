import type { Metadata } from "next";
import UserProfile from "@features/profile/ui/user-profile";

export const metadata: Metadata = {
  title: "Profile | TextHaven",
  description: "View your account here",
};

export default function ProfilePage() {
  return <UserProfile />;
}
