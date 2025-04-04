'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function ThemeButton({ className }: { className: string }) {
	const { theme, setTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) {
		return null
	}

	return (
		<button
			className={twMerge(
				'cursor-pointer relative flex flex-col items-center text-gray-800 dark:text-gray-100',
				className
			)}
			aria-label='Switch theme'
			onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}
		>
			{theme == 'light' ? (
				<Moon size={32} className='peer z-50 transition-colors duration-300 delay-75' />
			) : (
				<Sun size={32} className='peer z-50 transition-colors duration-300 delay-75' />
			)}
			<span className='text-gray-800 dark:text-gray-100 text-md delay-75 text-nowrap transition-all absolute opacity-0 peer-hover:opacity-100 peer-hover:block peer-hover:translate-y-10'>
				Switch theme
			</span>
		</button>
	)
}
