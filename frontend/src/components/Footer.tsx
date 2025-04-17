import Link from "next/link";

// temporary
const isAuth = false;

export default function Footer() {
  return (
    !isAuth && (
      <footer className="fixed bottom-0 h-[5vh] flex gap-x-10 bg-gray-100 dark:bg-gray-950 w-full">
        <Link
          className="text-xl font-bold"
          href={"?modal=login"}
          aria-label="Login"
        >
          Login
        </Link>
        <Link
          className="text-xl font-bold"
          href={"?modal=register"}
          aria-label="Register"
        >
          Register
        </Link>
      </footer>
    )
  );
}
