import type { Post } from "@widgets/posts/types";
import PostItem from "@widgets/posts/ui/post";

export default function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="mt-5 grid grid-rows-3 h-full gap-y-10">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}
