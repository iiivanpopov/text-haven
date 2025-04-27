import type { Metadata } from "next";
import LoginForm from "@features/auth/ui/login";

export const metadata: Metadata = {
  title: "Login | TextHaven",
  description: "Login",
};

export default function Login() {
  return (
    <div className="flex justify-center items-center w-[30wv] h-[30vh]">
      <LoginForm />
    </div>
  );
}
