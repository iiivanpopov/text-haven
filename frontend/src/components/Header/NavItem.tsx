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
		<Link href={url} aria-label={ariaLabel}>
			{Icon && (
				<Icon
					className={twMerge('text-primary delay-75 transition-colors', className)}
					size={iconSize}
				/>
			)}
		</Link>
	)
}
