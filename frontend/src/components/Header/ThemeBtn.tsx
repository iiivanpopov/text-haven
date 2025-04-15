'use client'

import { Moon, Sun } from 'lucide-react'
import { memo, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type Theme = 'light' | 'dark'

function ThemeButton({ className }: { className?: string }) {
	const [theme, setTheme] = useState<Theme | null>(null)

	useEffect(() => {
		if (typeof window == 'undefined') return

		const storedTheme = localStorage.getItem('theme') as Theme | null
		const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

		const initialTheme: Theme = storedTheme || (systemPrefersDark ? 'dark' : 'light')
		setTheme(initialTheme)
		document.documentElement.classList.toggle('dark', initialTheme == 'dark')
	}, [])

	useEffect(() => {
		if (theme == null) return
		document.documentElement.classList.toggle('dark', theme == 'dark')
		localStorage.setItem('theme', theme)
	}, [theme])

	const toggleTheme = () => {
		setTheme(prev => (prev == 'dark' ? 'light' : 'dark'))
	}

	const Icon = theme == 'dark' ? Sun : Moon

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
