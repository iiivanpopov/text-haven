import Post from '@components/Post'

const date = new Date()

const date1 = new Date(date.setHours(10))
const date2 = new Date(date.setHours(5))
const date3 = new Date(date.setHours(2))

export default function PostSection() {
	return (
		<div className='flex flex-col justify-between'>
			<h3 className='text-5xl text-gray-800 dark:text-gray-100'>Latest posts</h3>
			<div className='mt-5 grid grid-rows-3 h-full gap-y-10'>
				<Post
					id='0'
					title='Sample code'
					content={['def greet(name):', `\treturn 'Hello' + name + '!'`]}
					date={date1}
				/>
				<Post id='1' title='Meeting notes' content={'Q1 strategy discussion: ...'} date={date2} />
				<Post
					id='2'
					title='Favorite quote'
					content={'The only limit to our realization...'}
					date={date3}
				/>
			</div>
		</div>
	)
}
