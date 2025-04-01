import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge'

interface NavItemProps {
	icon: LucideIcon
	url: string
	iconSize?: number | string
	ariaLabel?: string
	className?: string
}

export default function NavItem({
	icon: Icon,
	url,
	iconSize = 32,
	ariaLabel,
	className,
}: NavItemProps) {
	return (
		<Link className='relative flex flex-col items-center' href={url} aria-label={ariaLabel}>
			{Icon && (
				<Icon
					className={twMerge('z-50 text-primary delay-75 transition-colors', className, 'peer')}
					size={iconSize}
				/>
			)}
			{ariaLabel && (
				<span className='text-md delay-75 text-nowrap transition-all absolute opacity-0 peer-hover:opacity-100 peer-hover:block peer-hover:translate-y-10'>
					{ariaLabel}
				</span>
			)}
		</Link>
	)
}
