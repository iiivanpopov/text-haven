import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full">
        <h1 className="text-6xl font-extrabold text-gray-800 dark:text-gray-100">
          404
        </h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block px-8 py-3 text-white bg-blue-400 rounded-md text-2xl font-semibold transition-colors duration-300 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
