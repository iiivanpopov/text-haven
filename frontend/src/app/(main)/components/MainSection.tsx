import Link from "next/link";

export default function MainSection() {
  return (
    <section className="h-[40vh] flex flex-col justify-between">
      <h1 className="text-8xl text-gray-800 dark:text-gray-100 font-bold">
        Share texts easily
      </h1>
      <p
        aria-label="subheading"
        className="text-2xl text-gray-700 dark:text-gray-200"
      >
        A simple and convenient tool for sharing text online. Create an new text
        below, or browse the latest public posts.
      </p>
      <Link
        href={"/storage"}
        aria-label="Go to storage"
        className="w-64 flex items-center justify-center transition-colors cursor-pointer bg-blue-400 dark:bg-blue-500 h-16 rounded-md text-gray-100 text-3xl hover:bg-blue-500 dark:hover:bg-blue-600"
      >
        New Post
      </Link>
    </section>
  );
}
