import type { Metadata } from "next";
import RegisterForm from "@features/auth/ui/register";

export const metadata: Metadata = {
  title: "Register | TextHaven",
  description: "Register",
};

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center">
      <h3 className="text-bold text-2xl mb-5">Register</h3>
      <RegisterForm />
    </div>
  );
}
