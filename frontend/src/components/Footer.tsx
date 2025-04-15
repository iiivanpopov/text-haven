import Link from 'next/link'

// temporary
const isAuth = false

export default function Footer() {
	return (
		!isAuth && (
			<div className='fixed bottom-0 h-[5vh] flex gap-x-10 bg-gray-100 dark:bg-gray-950 w-full'>
				<Link className='text-xl font-bold' href={'?modal=login'}>
					Login
				</Link>
				<Link className='text-xl font-bold' href={'?modal=register'}>
					Register
				</Link>
			</div>
		)
	)
}
