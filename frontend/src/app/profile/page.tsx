import Profile from "./[id]/page";

export default function ProfilePage() {
  return (
    <Profile params={new Promise((resolve) => resolve({ id: undefined }))} />
  );
}
