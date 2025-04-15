import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

const Title = ({ className, title }: { className?: string; title: string }) => (
	<span className={twMerge('text-gray-800 dark:text-gray-100 text-4xl', className)}>{title}</span>
)

export default memo(Title)
