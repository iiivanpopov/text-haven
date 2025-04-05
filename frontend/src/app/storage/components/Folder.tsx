import { Folder as Icon } from 'lucide-react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

export default function File({
	className,
	title,
	folderId,
}: {
	folderId: string
	className?: string
	title: string
}) {
	return (
		<Link
			href={`/storage/${folderId}`}
			className={twMerge(
				'hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors flex items-center border-b-2 border-gray-300 dark:border-gray-700 text-xl text-gray-700 dark:text-gray-200',
				className
			)}
		>
			<Icon size={32} className='text-gray-700 dark:text-gray-200' />
			<span className='ml-10'>{title}</span>
		</Link>
	)
}
