import Profile from "@/app/profile/component/profile";
import { use } from "react";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = use(params);
  return (
    <main className="mt-20 h-[25vh]">
      <Profile id={id} />
    </main>
  );
}
