'use client'

import Select from '@components/Select'
import { useEffect, useState } from 'react'

export default function Settings() {
	const [textDefType, setTextDefType] = useState('')

	useEffect(() => {
		const saved = localStorage.getItem('textdeftype')
		if (saved) setTextDefType(saved)
	}, [])

	return (
		<main className='mt-20 h-[20vh] grid grid-rows-2 gap-y-10'>
			<h1 className='text-gray-800 dark:text-gray-100 text-5xl'>Settings</h1>
			<div className='flex items-center gap-x-5'>
				<span className='font-semibold text-gray-800 dark:text-gray-100 text-2xl'>
					Default text type
				</span>
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
						className='w-40 text-xl'
						name={'Text Default Type'}
						ariaLabel='Select text default type'
					/>
				)}
			</div>
		</main>
	)
}
