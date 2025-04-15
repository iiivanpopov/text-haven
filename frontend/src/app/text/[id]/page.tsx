//example api response

const fakeResponse: {
	data: Record<
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
	>
	status: number
} = {
	status: 200,
	data: {
		'': {
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
	},
}

import { use } from 'react'
import { twMerge } from 'tailwind-merge'

export default function Text({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params)
	// rework later
	const fileData = Object.values(fakeResponse.data)
		.flatMap(folder => folder.files)
		.find(file => file.id == id)

	// const fileData = undefined

	return (
		<div className='mt-20'>
			<span
				className={twMerge(
					// rework "not found" later
					fileData
						? 'text-gray-800 dark:text-gray-100 text-4xl'
						: 'text-red-400 dark:text-red-500 text-6xl font-semibold'
				)}
			>
				{fileData?.name ?? 'File not found'}
			</span>
			<div
				className={twMerge(
					'text-xl',
					fileData ? 'text-gray-700 dark:text-gray-200' : 'text-gray-300 dark:text-gray-700',
					'w-10/12'
				)}
			>
				{fakeResponse.status == 200 ? (fileData?.content ? fileData.content : 'No content') : ''}
			</div>
		</div>
	)
}
