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
			className='bg-transparent outline-none border-none hover:cursor-pointer'
			onClick={onClick}
		>
			<Icon
				size={iconSize}
				className={twMerge('text-primary transition-colors delay-75', className)}
			/>
		</button>
	)
}
