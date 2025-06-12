"use client";

import { useGetPostsQuery } from "@widgets/posts/model/api";
import PostList from "@widgets/posts/ui/post-list";
import { PostsSkeleton } from "@widgets/posts/ui/posts-skeleton";

export const Posts = () => {
  const { data, isLoading, isError } = useGetPostsQuery();
  const postsData = data?.data;

  if (isLoading) return <PostsSkeleton />;
  if (isError) return <div>Error loading posts</div>;
  if (!postsData || (postsData && postsData.length == 0)) return null;

  return (
    <section className="flex flex-col justify-between">
      <h3 className="text-3xl sm:text-4xl md:text-5xl text-gray-800 dark:text-gray-100">
        Latest posts
      </h3>
      <PostList posts={postsData} />
    </section>
  );
};
