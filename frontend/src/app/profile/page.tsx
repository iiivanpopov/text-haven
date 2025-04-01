import Link from 'next/link'

export default function Profile() {
	return (
		<main className='mt-20 h-[25vh] flex flex-col gap-y-10 w-[450px]'>
			<div className='flex gap-x-10'>
				<div className='rounded-full min-w-[150px] min-h-[150px] size-[150px] bg-backing '></div>
				<div>
					<h4 className='text-primary text-subheading'>My name</h4>
					<span className='text-secondary text-body'>username@gmail.com</span>
				</div>
			</div>
			<Link
				href={'/profile/settings'}
				className='flex items-center justify-center transition-colors cursor-pointer bg-blue w-full h-16 rounded-md text-white text-3xl hover:bg-blue-dark'
			>
				Edit
			</Link>
		</main>
	)
}
