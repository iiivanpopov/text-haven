import { calculateTimeAgo } from '@utils/time'
import Link from 'next/link'
import PostContent, { type Content } from './PostContent'

interface PostProps {
	title: string
	content: Content
	date: Date
	id: string
}

export default function Post({ id, title, content, date }: PostProps) {
	return (
		<div className='border-outline-light dark:border-outline-dark border-2 rounded-md p-2 px-3 bg-background-secondary-light dark:bg-background-secondary-dark flex flex-col justify-between'>
			<Link href={`/text/${id}`}>
				<h4 className='text-primary-light dark:text-primary-dark text-card font-semibold'>
					{title}
				</h4>
			</Link>
			<PostContent content={content} />
			<span className='text-muted-light dark:text-muted-dark text-sm'>
				{calculateTimeAgo(date)}
			</span>
		</div>
	)
}
