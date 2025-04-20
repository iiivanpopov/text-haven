import { calculateTimeAgo } from "@utils/time";
import Link from "next/link";

interface PostProps {
  title: string;
  content: string;
  date: Date;
  id: string;
}

export default function Post({ id, title, content, date }: PostProps) {
  return (
    <div className=" border-gray-300 dark:border-gray-700 border-2 rounded-md p-2 px-3 bg-gray-100 dark:bg-gray-950 flex flex-col justify-between">
      <Link href={`/text/${id}`}>
        <h4
          aria-label="Post title"
          className="text-gray-800 dark:text-gray-100 text-xl font-semibold"
        >
          {title}
        </h4>
      </Link>
      <div className="bg-gray-200 dark:bg-gray-900 h-full rounded-sm p-1 pl-3 flex flex-col ">
        <span
          aria-label="Post content"
          className="break-all line-clamp-4 whitespace-pre-wrap text-gray-800 dark:text-gray-100"
        >
          {content}
        </span>
      </div>
      <span
        aria-label="Time past after creation"
        className="text-gray-400 dark:text-gray-500 text-sm"
      >
        {calculateTimeAgo(date)}
      </span>
    </div>
  );
}
