export type Content =
	| string
	| [string]
	| [string, string]
	| [string, string, string]
	| [string, string, string, string]

interface PostContentProps {
	content: Content
}

const truncate = (text: string, max = 40) => (text.length > max ? text.slice(0, max) + '...' : text)

export default function PostContent({ content }: PostContentProps) {
	if (Array.isArray(content)) {
		return (
			<div className='bg-gray-200 dark:bg-gray-900 h-full rounded-sm p-1 pl-3 flex flex-col text-gray-800 dark:text-gray-100'>
				{content.map(str => (
					<span className='whitespace-pre w-full' key={str}>
						{truncate(str)}
					</span>
				))}
			</div>
		)
	}

	return (
		<span className='h-full text-gray-800 dark:text-gray-100 bg-gray-200 dark:bg-gray-900 rounded-sm p-1 pl-3'>
			{truncate(content)}
		</span>
	)
}
