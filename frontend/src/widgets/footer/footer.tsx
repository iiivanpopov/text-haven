import Link from "next/link";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 h-[5vh] flex gap-x-10 bg-gray-100 dark:bg-gray-950 w-full">
      <Link className="text-xl font-bold" href={"/login"} aria-label="Login">
        Login
      </Link>
      <Link
        className="text-xl font-bold"
        href={"/register"}
        aria-label="Register"
      >
        Register
      </Link>
    </footer>
  );
}
