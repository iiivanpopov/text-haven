//example api response

const fakeFileSystem: Record<
	string,
	{
		folders?: {
			name: string
			id: string
		}[]
		files: {
			name: string
			id: string
			content: string
		}[]
	}
> = {
	'': {
		folders: [
			{ name: 'Folder A', id: 'a' },
			{ name: 'Folder B', id: 'b' },
		],
		files: [
			{
				name: 'Root File 1',
				id: 'a',
				content:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.',
			},
			{ name: 'Root File 2', id: 'b', content: 'Content 1' },
		],
	},
	a: {
		folders: [{ name: 'Folder C', id: 'c' }],
		files: [
			{ name: 'File 1', id: 'File 1', content: 'Content 1' },
			{ name: 'File 2', id: 'File 2', content: 'Content 1' },
		],
	},
	b: {
		files: [
			{ name: 'File 3', id: 'File 3', content: 'Content 1' },
			{ name: 'File 4', id: 'File 4', content: 'Content 1' },
		],
	},
	c: {
		files: [
			{ name: 'File 5', id: 'File 5', content: 'Content 1' },
			{ name: 'File 6', id: 'File 6', content: 'Content 1' },
		],
	},
}

import { use } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Text({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params)
	// rework later
	const fileData = Object.values(fakeFileSystem)
		.flatMap(folder => folder.files)
		.find(file => file.id == id)

	return (
		<div className='mt-20'>
			<span
				className={twMerge(
					'text-gray-800 dark:text-gray-100',
					// rework "not found" later
					fileData ? 'text-4xl' : 'text-red-400 dark:text-red-500 text-6xl font-semibold'
				)}
			>
				{fileData ? fileData.name : 'File not found'}
			</span>
			<div className={twMerge('text-gray-700 dark:text-gray-200 text-xl', 'w-10/12')}>
				{fileData && fileData.content}
			</div>
		</div>
	)
}
