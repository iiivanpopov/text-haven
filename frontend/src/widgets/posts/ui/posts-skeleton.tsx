import PostList from "@widgets/posts/ui/post-list";
import { SKELETON_POSTS } from "@widgets/posts/constants";

export const PostsSkeleton = () => {
  return (
    <section className="animate-pulse flex flex-col justify-between">
      <h3 className="text-3xl sm:text-4xl md:text-5xl text-gray-800 dark:text-gray-100">
        Latest posts
      </h3>
      <PostList posts={SKELETON_POSTS} />
    </section>
  );
};
