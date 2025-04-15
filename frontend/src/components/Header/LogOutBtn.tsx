'use client'

import { LogOut } from 'lucide-react'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

interface LogOutProps {
	className?: string
	ariaLabel?: string
	iconSize?: number | string
}

const LogOutBtn = ({ iconSize = 32, className, ariaLabel }: LogOutProps) => (
	<button
		aria-label={ariaLabel}
		className='z-0 relative flex flex-col items-center bg-transparent outline-none border-none hover:cursor-pointer'
		onClick={() => console.log('Logout')}
	>
		<LogOut
			size={iconSize}
			className={twMerge(
				'z-40 text-gray-800 dark:text-gray-100 transition-colors delay-75 peer',
				className
			)}
		/>
		{ariaLabel && (
			<span className='text-nowrap absolute opacity-0 peer-hover:opacity-100 peer-hover:block peer-hover:translate-y-10 text-md text-gray-800 dark:text-gray-100 transition-all delay-75 z-30'>
				{ariaLabel}
			</span>
		)}
	</button>
)

export default memo(LogOutBtn)
