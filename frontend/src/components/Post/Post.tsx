import { calculateTimeAgo } from '@utils/time'
import Link from 'next/link'
import { PostContent } from './PostContent'

export type Content =
	| string
	| [string]
	| [string, string]
	| [string, string, string]
	| [string, string, string, string]

interface PostProps {
	title: string
	content: Content
	date: Date
	id: string
}

export default function Post({ id, title, content, date }: PostProps) {
	const timeAgo = calculateTimeAgo(date)

	return (
		<div className='border-gray-300 dark:border-gray-700 border-2 rounded-md p-2 px-3 bg-gray-100 dark:bg-gray-950 flex flex-col justify-between'>
			<Link href={`/text/${id}`}>
				<h4 className='text-gray-800 dark:text-gray-100 text-xl font-semibold'>{title}</h4>
			</Link>
			<PostContent content={content} />
			<span className='text-gray-400 dark:text-gray-500 text-sm'>{timeAgo}</span>
		</div>
	)
}
