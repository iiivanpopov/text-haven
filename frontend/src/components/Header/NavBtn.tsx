import type { LucideIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface NavBtnProps {
	className?: string
	icon: LucideIcon
	ariaLabel?: string
	iconSize?: number | string
	onClick: () => void
}

export default function ({
	onClick,
	icon: Icon,
	iconSize = 32,
	className,
	ariaLabel,
}: NavBtnProps) {
	return (
		<button
			aria-label={ariaLabel}
			className='relative flex flex-col items-center bg-transparent outline-none border-none hover:cursor-pointer'
			onClick={onClick}
		>
			{Icon && (
				<Icon
					size={iconSize}
					className={twMerge(
						'z-50 text-gray-800 dark:text-gray-100 transition-colors delay-75',
						className,
						'peer'
					)}
				/>
			)}
			{ariaLabel && (
				<span className='text-gray-800 dark:text-gray-100 text-md text-nowrap delay-75 transition-all absolute opacity-0 peer-hover:opacity-100 peer-hover:block peer-hover:translate-y-10'>
					{ariaLabel}
				</span>
			)}
		</button>
	)
}
