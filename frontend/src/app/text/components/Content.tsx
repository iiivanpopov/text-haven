import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

const Content = ({ content }: { content: string | undefined }) => {
	return (
		<div
			className={twMerge(
				'text-xl',
				content ? 'text-gray-700 dark:text-gray-200' : 'text-gray-300 dark:text-gray-700',
				'w-10/12'
			)}
		>
			{content ? content : 'No content'}
		</div>
	)
}

export default memo(Content)
