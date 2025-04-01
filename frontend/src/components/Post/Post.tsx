import PostContent, { type Content } from './PostContent'
import PostDate from './PostDate'
import PostTitle from './PostTitle'

interface PostProps {
	title: string
	content: Content
	date: Date
	id: string
}

export default function Post({ id, title, content, date }: PostProps) {
	return (
		<div className='border-outline-light dark:border-outline-dark border-2 rounded-md p-2 px-3 bg-background-secondary-light dark:bg-background-secondary-dark flex flex-col justify-between'>
			<PostTitle title={title} id={id} />
			<PostContent content={content} />
			<PostDate date={date} />
		</div>
	)
}
