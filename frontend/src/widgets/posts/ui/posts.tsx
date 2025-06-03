"use client";

import { useGetPostsQuery } from "@widgets/posts/model/api";
import PostList from "@widgets/posts/ui/post-list";

export const Posts = () => {
  const { data, isLoading, isError } = useGetPostsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;
  if (!data || (data && data.length == 0)) return null;

  return (
    <section className="flex flex-col justify-between">
      <h3 className="text-3xl sm:text-4xl md:text-5xl text-gray-800 dark:text-gray-100">
        Latest posts
      </h3>
      <PostList posts={data} />
    </section>
  );
};
