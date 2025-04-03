'use client'

import Link from 'next/link'
import { useState } from 'react'
import Post from '../../components/Post'

export default function Main() {
	const [date, setDate] = useState<Date>(new Date())

	return (
		<main className='mt-20 grid grid-cols-[5fr_2fr] gap-x-20'>
			<div className='h-[40vh] flex flex-col justify-between'>
				<h1 className='text-heading text-primary-light dark:text-primary-dark font-bold'>
					Share texts easily
				</h1>
				<p className='text-[1.6rem] text-secondary-light dark:text-secondary-dark'>
					A simple and convenient tool for sharing text online. Create an new text below, or browse
					the latest public posts.
				</p>
				<Link
					href={'/storage'}
					aria-label='Go to storage'
					className='flex items-center justify-center transition-colors cursor-pointer bg-blue-light dark:bg-blue-dark w-64 h-16 rounded-md text-white text-3xl hover:bg-blue-dark-light dark:hover:bg-blue-dark-dark'
				>
					New Post
				</Link>
			</div>
			<div className='flex flex-col justify-between'>
				<h3 className='text-subheading text-primary-light dark:text-primary-dark'>Latest posts</h3>
				<div className='mt-5 grid grid-rows-3 h-full gap-y-10'>
					<Post
						id='0'
						title='Sample code'
						content={['def greet(name):', `\treturn 'Hello' + name + '!'`]}
						date={date}
					/>
					<Post id='1' title='Meeting notes' content={'Q1 strategy discussion: ...'} date={date} />
					<Post
						id='2'
						title='Favorite quote'
						content={'The only limit to our realization...'}
						date={date}
					/>
				</div>
			</div>
		</main>
	)
}
