import Posts from "@/app/(main)/components/Posts";

export default function PostSection() {
  return (
    <section className="flex flex-col justify-between">
      <h3 className="text-5xl text-gray-800 dark:text-gray-100">
        Latest posts
      </h3>
      <div className="mt-5 grid grid-rows-3 h-full gap-y-10">
        <Posts />
      </div>
    </section>
  );
}
