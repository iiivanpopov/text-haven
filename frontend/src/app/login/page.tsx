import type { Metadata } from "next";
import LoginForm from "@features/auth/ui/login";

export const metadata: Metadata = {
  title: "Login | TextHaven",
  description: "Login",
};

export default function Login() {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-bold text-2xl mb-5">Login</h3>
      <LoginForm />
    </div>
  );
}
