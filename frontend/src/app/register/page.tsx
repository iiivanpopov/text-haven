import type { Metadata } from "next";
import RegisterForm from "@features/auth/ui/register";

export const metadata: Metadata = {
  title: "Register | TextHaven",
  description: "Register",
};

export default function Register() {
  return (
    <div className="flex justify-center items-center w-[30wv] h-[35vh]">
      <RegisterForm />
    </div>
  );
}
