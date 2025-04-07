'use client'

import File from '@components/File'
import Input from '@components/Input'
import Post from '@components/Post'
import Link from 'next/link'
import { useMemo, useState } from 'react'

const TEXTS = ['Title #1', 'Some 2', 'Anything 3', `I don't care 4`, `Xd 5`]

export default function Dashboard() {
	const [search, setSearch] = useState('')

	const filteredTexts = useMemo(() => {
		if (!search) return TEXTS
		const pattern = new RegExp(search, 'i')
		return TEXTS.filter(text => pattern.test(text))
	}, [search])

	return (
		<main className='mt-20 grid grid-cols-[5fr_3fr] gap-x-20'>
			<div className='flex flex-col justify-between'>
				<div className='flex flex-col gap-y-10'>
					<div className='flex flex-col gap-y-3'>
						<p className='text-2xl text-gray-700 dark:text-gray-200'>Filter your texts</p>
						<Input
							name='search'
							value={search}
							className='h-12'
							placeholder='Search'
							onChange={e => setSearch(e.target.value)}
						/>
					</div>
					<div className='grid grid-rows-4 gap-y-8'>
						{filteredTexts.map(text => (
							<File key={text} fileId={text} className='h-14 px-5' title={text} />
						))}
					</div>
				</div>
				<Link
					href='/storage'
					aria-label='Go to storage'
					className='w-full flex items-center justify-center transition-colors cursor-pointer bg-blue-400 dark:bg-blue-500 h-14 rounded-md text-white text-2xl hover:bg-blue-500 dark:hover:bg-blue-600'
				>
					Create text
				</Link>
			</div>
			<div className='flex flex-col justify-between'>
				<h3 className='text-5xl text-gray-800 dark:text-gray-100'>Your posts</h3>
				<div className='mt-5 grid grid-rows-3 h-full gap-y-10'>
					<Post
						id='0'
						title='Sample code'
						content={['def greet(name):', "\treturn 'Hello' + name + '!'"]}
						date={new Date()}
					/>
					<Post
						id='1'
						title='Meeting notes'
						content={'Q1 strategy discussion: ...'}
						date={new Date()}
					/>
					<Post
						id='2'
						title='Favorite quote'
						content={'The only limit to our realization...'}
						date={new Date()}
					/>
				</div>
			</div>
		</main>
	)
}
