import Link from 'next/link'

export default function Profile() {
	return (
		<main className='mt-20 h-[25vh] flex flex-col gap-y-10 w-[450px]'>
			<div className='flex gap-x-10'>
				<div className='rounded-full min-w-[150px] min-h-[150px] size-[150px] bg-backing-light dark:bg-backing-dark'></div>
				<div>
					<h4 className='text-primary-light dark:text-primary-dark text-subheading'>My name</h4>
					<span className='text-secondary-light dark:text-secondary-dark text-body'>
						username@gmail.com
					</span>
				</div>
			</div>
			<Link
				href={'/profile/settings'}
				aria-label='Go to profile settings'
				className='flex items-center justify-center transition-colors cursor-pointer bg-blue-light dark:bg-blue-dark w-full h-16 rounded-md text-white text-3xl dark:hover:bg-blue-dark-dark hover:bg-blue-dark-light'
			>
				Edit
			</Link>
		</main>
	)
}
