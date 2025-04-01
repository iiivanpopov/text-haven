import Post from '@components/Post'
import Link from 'next/link'

export default function Main() {
	return (
		<main className='mt-20 grid grid-cols-[5fr_2fr] gap-x-20'>
			<div className='h-[40vh] flex flex-col justify-between'>
				<h1 className='text-heading text-primary font-bold'>Share texts easily</h1>
				<p className='text-body text-secondary'>
					A simple and convenient tool for sharing text online. Create an new text below, or browse
					the latest public posts.
				</p>
				<Link
					href={'/storage'}
					className='flex items-center justify-center transition-colors cursor-pointer bg-blue w-64 h-16 rounded-md text-white text-3xl hover:bg-blue-dark'
				>
					New Post
				</Link>
			</div>
			<div className='flex flex-col justify-between'>
				<h3 className='text-subheading text-primary'>Latest posts</h3>
				<div className='mt-5 grid grid-rows-3 h-full gap-y-10'>
					<Post
						id='0'
						title='Sample code'
						content={['def greet(name):', `\treturn 'Hello' + name + '!'`]}
						date={new Date()}
					/>
					<Post
						id='1'
						title='Meeting notes'
						content={'Q1 strategy discussion: ...'}
						date={new Date(new Date().setHours(2))}
					/>
					<Post
						id='2'
						title='Favorite quote'
						content={'The only limit to our realization...'}
						date={new Date(new Date().setMinutes(15))}
					/>
				</div>
			</div>
		</main>
	)
}
