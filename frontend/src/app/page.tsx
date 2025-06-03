import { Metadata } from "next";
import Link from "next/link";
import { Posts } from "@widgets/posts/ui/posts";

export const metadata: Metadata = {
  title: "TextHaven",
  description: "An app to share and post texts",
};

export default function Home() {
  return (
    <main className="mt-20 grid grid-cols-1 lg:grid-cols-[5fr_2fr] gap-10 px-6 sm:px-10 lg:px-20 ">
      <section className="flex flex-col justify-between h-[40vh]">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl text-gray-800 dark:text-gray-100 font-bold">
          Share texts easily
        </h1>
        <p
          aria-labelledby="subheading"
          className="mt-4 text-lg sm:text-xl text-gray-700 dark:text-gray-200"
        >
          A simple and convenient tool for sharing text online. Create a new
          text below, or browse the latest public posts.
        </p>
        <Link
          href="/storage"
          aria-label="Create a new post"
          className="mt-6 w-full sm:w-64 flex items-center justify-center transition-colors cursor-pointer bg-blue-400 dark:bg-blue-500 h-16 rounded-md text-gray-100 text-2xl sm:text-3xl hover:bg-blue-500 dark:hover:bg-blue-600"
        >
          New Post
        </Link>
      </section>

      <Posts />
    </main>
  );
}
