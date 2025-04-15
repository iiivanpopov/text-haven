import Link from 'next/link'

export default function Profile() {
	return (
		<main className='mt-20 h-[25vh] flex flex-col gap-y-10'>
			<div className='flex gap-x-10'>
				<div className='rounded-full min-w-[150px] min-h-[150px] size-[150px] bg-gray-300 dark:bg-gray-900'></div>
				<div className='flex flex-col justify-between'>
					<div>
						<h4 className='text-gray-800 dark:text-gray-100 text-2xl'>My name</h4>
						<span className='text-gray-700 dark:text-gray-200 text-xl'>username@gmail.com</span>
					</div>
					<span className='text-gray-400 dark:text-gray-500 text-sm'>Public</span>
				</div>
			</div>
			<Link
				href={'/profile/settings'}
				aria-label='Go to profile settings'
				className='flex items-center justify-center transition-colors cursor-pointer bg-blue-400 dark:bg-blue-500 w-64 h-16 rounded-md text-3xl dark:hover:bg-blue-600 hover:bg-blue-500 text-gray-100'
			>
				Edit
			</Link>
		</main>
	)
}
