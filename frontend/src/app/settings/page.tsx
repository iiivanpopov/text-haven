'use client'

import Button from '@components/Button'
import Select from '@components/Select'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function Settings() {
	const { theme, setTheme } = useTheme()
	const [textDefType, setTextDefType] = useState('')

	useEffect(() => {
		const saved = localStorage.getItem('textdeftype')
		if (saved) setTextDefType(saved)
	}, [])

	return (
		<main className='mt-20 h-[20vh] grid grid-rows-2 gap-y-10'>
			<div className='flex items-center gap-x-10'>
				<h1 className='text-primary-light dark:text-primary-dark text-subheading '>Settings</h1>
				<Button
					onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}
					name='Switch theme'
					ariaLabel='Switch theme'
					className='bg-blue-light dark:bg-blue-dark hover:bg-blue-dark-light dark:hover:dark:bg-blue-dark-dark'
				/>
			</div>
			<div className='flex gap-x-5'>
				<div>
					<h4 className='text-primary-light dark:text-primary-dark text-[1.2rem]'>
						Default text type
					</h4>
					{textDefType && (
						<Select
							value={textDefType}
							onChange={e => {
								const value = e.target.value
								setTextDefType(value)
								localStorage.setItem('textdeftype', value)
							}}
							options={[
								{ name: 'Note', value: 'note' },
								{ name: 'Post', value: 'post' },
							]}
							name={'Text Default Type'}
						/>
					)}
				</div>
			</div>
		</main>
	)
}
