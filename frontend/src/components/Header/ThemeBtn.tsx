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

	if (!mounted) return null

	const Icon = theme == 'light' ? Moon : Sun

	return (
		<button
			aria-label='Switch theme'
			onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}
			className={twMerge(
				'cursor-pointer relative flex flex-col items-center text-gray-800 dark:text-gray-100 transition-colors duration-300',
				className
			)}
		>
			<Icon size={32} className='peer z-50 transition-colors duration-300 delay-75' />
			<span className='absolute opacity-0 peer-hover:opacity-100 peer-hover:block peer-hover:translate-y-10 text-md transition-all delay-75 text-nowrap text-gray-800 dark:text-gray-100'>
				Switch theme
			</span>
		</button>
	)
}
