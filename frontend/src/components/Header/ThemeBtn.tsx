'use client'

import { Moon, Sun } from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

function ThemeButton({ className }: { className: string }) {
	const [theme, setTheme] = useState<'light' | 'dark'>('light')

	useEffect(() => {
		const savedTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light'
		setTheme(savedTheme)
	}, [])

	useEffect(() => {
		const root = document.documentElement
		if (theme == 'dark') {
			root.classList.add('dark')
		} else {
			root.classList.remove('dark')
		}
		localStorage.setItem('theme', theme)
	}, [theme])

	const toggleTheme = () => {
		setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))
	}

	const Icon = theme == 'light' ? Moon : Sun

	return (
		<button
			aria-label='Switch theme'
			onClick={toggleTheme}
			className={twMerge(
				'z-0 cursor-pointer relative flex flex-col items-center text-gray-800 dark:text-gray-100 transition-colors duration-300',
				className
			)}
		>
			<Icon size={32} className='peer z-40 transition-colors duration-300 delay-75' />
			<span className='z-30 absolute opacity-0 peer-hover:opacity-100 peer-hover:block peer-hover:translate-y-10 text-md transition-all delay-75 text-nowrap text-gray-800 dark:text-gray-100'>
				Switch theme
			</span>
		</button>
	)
}

export default memo(ThemeButton)
