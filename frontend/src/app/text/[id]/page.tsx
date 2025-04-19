'use client'

type FileStructure = {
	name: string
	id: string
	content: string
}

type FolderStructure = {
	name: string
	id: string
}

type FileSystem = {
	folders?: FolderStructure[]
	files?: FileStructure[]
}

//example api response
const fakeResponse: {
	status: number
	data: FileSystem
} = {
	status: 200,
	data: {
		files: [
			{
				name: 'Root File 1',
				id: 'a',
				content:
					'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi voluptas amet sed adipisci fugit neque quo ipsa veniam aliquid officia? Fugiat a accusamus quo. Ut iure possimus odit reiciendis aliquid.',
			},
			{ name: 'Root File 2', id: 'b', content: 'Content 1' },
		],
	},
}

import Input from '@components/shared/Input'
import TextArea from '@components/shared/TextArea'
import { use, useEffect, useState } from 'react'
import ChangeModeBtn from '../components/ChangeModeBtn'
import Content from '../components/Content'

const isUserOwner = true

export default function Text({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params)

	const [mode, setMode] = useState<'edit' | 'read'>('read')
	const [title, setTitle] = useState<string>('')
	const [content, setContent] = useState<string>('')

	useEffect(() => {
		const fileData = fakeResponse.data.files?.find(file => file.id == id)
		if (!fileData) return

		setTitle(fileData.name)
		setContent(fileData.content)
	}, [])

	if (fakeResponse.status !== 200) {
		return (
			<div className='mt-10'>
				<h3 className='text-red-400 dark:text-red-500 text-6xl font-semibold'>Not found</h3>
			</div>
		)
	}

	return (
		<div className='mt-10 grid grid-rows-[5vh_1fr]'>
			<div className='w-full flex items-center'>
				{isUserOwner && (
					<ChangeModeBtn
						mode={mode}
						onClick={() => setMode(prev => (prev == 'read' ? 'edit' : 'read'))}
					/>
				)}
			</div>
			<div className='flex flex-col'>
				{mode == 'read' ? (
					<>
						<h4 className={'text-gray-800 dark:text-gray-100 text-4xl'}>{title}</h4>
						<Content>{content}</Content>
					</>
				) : (
					<>
						<Input
							name='Title'
							className='text-gray-800 dark:text-gray-100 text-4xl p-0'
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>

						<TextArea
							value={content}
							onChange={e => setContent(e.target.value)}
							className='text-md overflow-auto h-[70vh] w-[1270px]'
						/>
					</>
				)}
			</div>
		</div>
	)
}
