'use client'

import { Folder, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import NavBtn from './NavBtn'
import NavItem from './NavItem'

export default function () {
	return (
		<header className='flex justify-between items-center'>
			<Link href={'/'}>
				<h1 className='hover:font-bold duration-100 delay-75 transition-all text-subheading text-primary'>
					Text Haven
				</h1>
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
						ariaLabel='Settings'
					/>
					<NavBtn
						onClick={() => console.log('Log out')}
						icon={LogOut}
						className='text-red hover:text-red-dark'
						ariaLabel='Log Out'
					/>
				</div>
			</nav>
		</header>
	)
}
