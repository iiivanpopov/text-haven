import { calculateTimeAgo } from "@shared/lib/time";
import Link from "next/link";
import type { Post } from "@entities/post/types";

export default function Post({ post }: { post: Post }) {
  return (
    <div className=" border-gray-300 dark:border-gray-700 border-2 rounded-md p-2 px-3 bg-gray-100 dark:bg-gray-950 flex flex-col justify-between">
      <Link href={`/text/${post.id}`}>
        <h4
          aria-label="Post title"
          className="text-gray-800 dark:text-gray-100 text-xl font-semibold"
        >
          {post.name}
        </h4>
      </Link>
      <div className="bg-gray-200 dark:bg-gray-900 h-full rounded-sm p-1 pl-3 flex flex-col ">
        <span
          aria-label="Post content"
          className="break-all line-clamp-4 whitespace-pre-wrap text-gray-800 dark:text-gray-100"
        >
          {post.content}
        </span>
      </div>
      <span
        aria-label="Time past after creation"
        className="text-gray-400 dark:text-gray-500 text-sm"
      >
        {calculateTimeAgo(post.createdAt)}
      </span>
    </div>
  );
}
