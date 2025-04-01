'use client'

import Button from '@components/Button'
import { useTheme } from 'next-themes'

export default function Settings() {
	const { theme, setTheme } = useTheme()

	return (
		<main className='mt-20'>
			<div className='h-[20vh] grid grid-rows-2'>
				<h1 className='text-primary-light dark:text-primary-dark text-subheading'>Settings</h1>
				<Button
					onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
					name={'Switch theme'}
					className='bg-blue-light dark:bg-blue-dark hover:bg-blue-dark-light dark:hover:dark:bg-blue-dark-dark'
				/>
			</div>
		</main>
	)
}
