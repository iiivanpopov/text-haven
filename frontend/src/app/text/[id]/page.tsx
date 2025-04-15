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

import { use, useEffect, useState } from 'react'
import ChangeModeBtn from '../components/ChangeModeBtn'
import EditMode from '../components/EditMode'
import ReadMode from '../components/ReadMode'

// fake data
const isUserOwner = true

export default function Text({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params)

	const [mode, setMode] = useState<'edit' | 'read'>('read')
	const [title, setTitle] = useState<string>('')
	const [content, setContent] = useState<string>('')

	// fake filedata
	const fileData = fakeResponse.data.files?.find(file => file.id == id)

	useEffect(() => {
		if (fileData) {
			setTitle(fileData.name)
			setContent(fileData.content)
		}
	}, [fileData])

	if (fakeResponse.status !== 200) {
		return (
			<div className='mt-20'>
				<h3 className='text-red-400 dark:text-red-500 text-6xl font-semibold'>Not found</h3>
			</div>
		)
	}

	return (
		<div className='mt-20 grid grid-rows-[5vh_fit] pb-[10vh]'>
			<div className='flex flex-col gap-y-5'>
				{isUserOwner && (
					<ChangeModeBtn
						mode={mode}
						onClick={() => setMode(prev => (prev == 'read' ? 'edit' : 'read'))}
					/>
				)}
				{mode == 'read' ? (
					<ReadMode title={title} content={content} />
				) : (
					<EditMode
						title={title}
						content={content}
						setTitle={title => setTitle(title)}
						setContent={content => setContent(content)}
					/>
				)}
			</div>
		</div>
	)
}
