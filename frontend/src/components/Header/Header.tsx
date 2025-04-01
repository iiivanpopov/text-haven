'use client'

import { Folder, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import NavBtn from './NavBtn'
import NavItem from './NavItem'

export default function () {
	return (
		<header className='flex justify-between items-center'>
			<Link href={'/'}>
				<h1 className='hover:font-bold duration-100 delay-75 transition-all text-subheading text-primary-light dark:text-primary-dark'>
					Text Haven
				</h1>
			</Link>
			<nav className='flex w-80 justify-between'>
				<div className='w-24 flex justify-between'>
					<NavItem
						icon={Folder}
						url={'/storage'}
						className='hover:text-blue-light dark:hover:text-blue-dark'
						ariaLabel='Storage'
					/>
					<NavItem
						icon={User}
						url={'/profile'}
						className='hover:text-blue-light dark:hover:text-blue-dark'
						ariaLabel='Profile'
					/>
				</div>
				<div className='w-24 flex justify-between'>
					<NavItem
						icon={Settings}
						url={'/settings'}
						className='hover:text-blue-light dark:hover:text-blue-dark'
						ariaLabel='Settings'
					/>
					<NavBtn
						onClick={() => console.log('Log out')}
						icon={LogOut}
						className='text-red-light hover:text-red-dark-light dark:text-red-dark dark:hover:text-red-dark-dark'
						ariaLabel='Log Out'
					/>
				</div>
			</nav>
		</header>
	)
}
