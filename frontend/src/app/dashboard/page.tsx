'use client'

import Input from '@components/Input'
import Post from '@components/Post'
import Link from 'next/link'
import { useMemo, useState } from 'react'

export default function Dashboard() {
	const [search, setSearch] = useState('')
	const texts = useMemo(() => ['Title #1', 'Some 2', 'Anything 3', `I don't care 4`], [])

	const filteredTexts = useMemo(() => {
		if (!search) return texts
		const pattern = new RegExp(search, 'i')
		return texts.filter(text => pattern.test(text))
	}, [search, texts])

	return (
		<main className='mt-20 grid grid-cols-[5fr_3fr] gap-x-20'>
			<div className='flex flex-col justify-between'>
				<div className='flex flex-col gap-y-10'>
					<div className='flex flex-col gap-y-3'>
						<p className='text-[1.6rem] text-secondary-light dark:text-secondary-dark'>
							Filter your texts
						</p>
						<Input
							name='search'
							value={search}
							className='h-[75px]'
							placeholder='Search'
							onChange={e => setSearch(e.target.value)}
						/>
					</div>
					<div className='flex flex-col gap-y-10'>
						{filteredTexts.map(text => (
							<Link
								key={text}
								href={`/text/${text}`}
								className='h-16 border-2 flex items-center border-outline-light rounded-md dark:border-outline-dark bg-background-secondary-light dark:bg-background-secondary-dark'
							>
								<span className='ml-5 text-secondary-light dark:text-secondary-dark'>{text}</span>
							</Link>
						))}
					</div>
				</div>
				<Link
					href='/storage'
					aria-label='Go to storage'
					className='w-full flex items-center justify-center transition-colors cursor-pointer bg-blue-light dark:bg-blue-dark h-16 rounded-md text-white text-3xl hover:bg-blue-dark-light dark:hover:bg-blue-dark-dark'
				>
					Create text
				</Link>
			</div>
			<div className='flex flex-col justify-between'>
				<h3 className='text-subheading text-primary-light dark:text-primary-dark'>Your posts</h3>
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
