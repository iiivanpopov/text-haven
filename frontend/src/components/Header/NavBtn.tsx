import type { LucideIcon } from 'lucide-react'
import { memo } from 'react'
import { twMerge } from 'tailwind-merge'

interface NavBtnProps {
	className?: string
	icon: LucideIcon
	ariaLabel?: string
	iconSize?: number | string
	onClick: () => void
}

const NavBtn = ({ onClick, icon: Icon, iconSize = 32, className, ariaLabel }: NavBtnProps) => (
	<button
		aria-label={ariaLabel}
		className='relative flex flex-col items-center bg-transparent outline-none border-none hover:cursor-pointer'
		onClick={onClick}
	>
		<Icon
			size={iconSize}
			className={twMerge(
				'z-50 text-gray-800 dark:text-gray-100 transition-colors delay-75 peer',
				className
			)}
		/>
		{ariaLabel && (
			<span className='text-nowrap absolute opacity-0 peer-hover:opacity-100 peer-hover:block peer-hover:translate-y-10 text-md text-gray-800 dark:text-gray-100 transition-all delay-75'>
				{ariaLabel}
			</span>
		)}
	</button>
)

export default memo(NavBtn)
