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
			<div className='bg-backing-light dark:bg-backing-dark h-full rounded-sm p-1 pl-3 flex flex-col text-primary-light dark:text-primary-dark'>
				{content.map(str => (
					<span className='whitespace-pre w-full truncate' key={str}>
						{truncate(str)}
					</span>
				))}
			</div>
		)
	}

	return (
		<span className='h-full text-primary-light dark:text-primary-dark bg-backing-light dark:bg-backing-dark rounded-sm p-1 pl-3'>
			{truncate(content)}
		</span>
	)
}
