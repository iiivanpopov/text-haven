'use client'

import { Folder, LayoutDashboard, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import NavBtn from './NavBtn'
import NavItem from './NavItem'
import ThemeButton from './ThemeBtn'

export default function () {
	return (
		<header className='grid grid-cols-3 items-center'>
			<Link href={'/'}>
				<h1 className='hover:font-bold duration-100 delay-75 transition-all text-5xl text-gray-800 dark:text-gray-100'>
					Text Haven
				</h1>
			</Link>
			<div className='w-32 flex justify-between justify-self-center'>
				<NavItem
					icon={Folder}
					url={'/storage'}
					className='hover:text-blue-400 dark:hover:text-blue-500'
					ariaLabel='Storage'
				/>
				<NavItem
					icon={LayoutDashboard}
					url={'/dashboard'}
					className='hover:text-blue-400 dark:hover:text-blue-500'
					ariaLabel='Dashboard'
				/>
				<NavItem
					icon={User}
					url={'/profile'}
					className='hover:text-blue-400 dark:hover:text-blue-500'
					ariaLabel='Profile'
				/>
			</div>
			<div className='grid grid-cols-3 w-40 items-center justify-between justify-self-end'>
				<ThemeButton className='hover:text-blue-400 dark:hover:text-blue-500' />
				<NavItem
					icon={Settings}
					url={'/settings'}
					className='hover:text-blue-400 dark:hover:text-blue-500'
					ariaLabel='Settings'
				/>
				<NavBtn
					onClick={() => console.log('Log out')}
					icon={LogOut}
					className='text-red-400 hover:text-red-500 dark:text-red-500 dark:hover:text-red-600'
					ariaLabel='Log Out'
				/>
			</div>
		</header>
	)
}
