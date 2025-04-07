import { truncate } from '@utils/strings'
import { Content } from './Post'

interface PostContentProps {
	content: Content
}

export function PostContent({ content }: PostContentProps) {
	const renderContent = (content: Content) => {
		if (Array.isArray(content)) {
			return content.map((str, idx) => (
				<span key={idx} className='whitespace-pre w-full'>
					{truncate(str)}
				</span>
			))
		}
		return <span className='h-full'>{truncate(content)}</span>
	}

	return (
		<div className='bg-gray-200 dark:bg-gray-900 h-full rounded-sm p-1 pl-3 flex flex-col text-gray-800 dark:text-gray-100'>
			{renderContent(content)}
		</div>
	)
}
