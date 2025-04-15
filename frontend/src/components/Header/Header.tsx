import { Folder, Settings, User } from 'lucide-react'
import Link from 'next/link'
import LogOutBtn from './LogOut'
import NavItem from './NavItem'
import ThemeButton from './ThemeBtn'

const ICON_HOVER_CLASSES = 'hover:text-blue-400 dark:hover:text-blue-500'

export default function Header() {
	return (
		<header className='grid grid-cols-3 items-center'>
			<Link href='/' className='w-fit inline'>
				<h1 className='text-5xl text-gray-800 dark:text-gray-100 transition-all duration-100 delay-75 hover:font-bold '>
					Text Haven
				</h1>
			</Link>
			<div className='w-20 flex justify-between justify-self-center'>
				<NavItem icon={Folder} url='/storage' className={ICON_HOVER_CLASSES} ariaLabel='Storage' />
				<NavItem icon={User} url='/profile' className={ICON_HOVER_CLASSES} ariaLabel='Profile' />
			</div>
			<div className='grid grid-cols-3 w-40 items-center justify-between justify-self-end'>
				<ThemeButton className={ICON_HOVER_CLASSES} />
				<NavItem
					icon={Settings}
					url='/settings'
					className={ICON_HOVER_CLASSES}
					ariaLabel='Settings'
				/>
				<LogOutBtn
					className='text-red-400 hover:text-red-500 dark:text-red-500 dark:hover:text-red-600'
					ariaLabel='Log Out'
				/>
			</div>
		</header>
	)
}
