"use client";

import { useGetPostsQuery } from "@features/posts/model/api";
import Post from "@entities/post/ui/post";

export default function PostList() {
  const { data, isLoading, isError } = useGetPostsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading posts</div>;
  if (!data || (data && data.length == 0)) return null;

  return (
    <div className="mt-5 grid grid-rows-3 h-full gap-y-10">
      {data.map((post) => (
        <Post
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}
