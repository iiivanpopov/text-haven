'use client'

import { Folder, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import NavBtn from './NavBtn'
import NavItem from './NavItem'

export default function Header() {
	return (
		<header className='flex justify-between items-center'>
			<Link href={'/'} className='text-subheading text-primary'>
				<h1>Text Haven</h1>
			</Link>
			<nav className='flex w-80 justify-between'>
				<div className='w-24 flex justify-between'>
					<NavItem icon={Folder} url={'/storage'} className='hover:text-blue' ariaLabel='Storage' />
					<NavItem icon={User} url={'/profile'} className='hover:text-blue' ariaLabel='Profile' />
				</div>
				<div className='w-24 flex justify-between'>
					<NavItem
						icon={Settings}
						url={'/settings'}
						className='hover:text-blue'
						ariaLabel='Profile'
					/>
					<NavBtn
						onClick={() => console.log('Log out')}
						icon={LogOut}
						className='text-red hover:text-red-hover '
						aria-label='Log Out'
					/>
				</div>
			</nav>
		</header>
	)
}
