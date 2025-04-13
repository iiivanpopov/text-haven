import { type PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

type ButtonStyle = 'solid' | 'outline'

interface ButtonProps extends PropsWithChildren {
	name: string
	onClick: () => void
	className?: string
	style?: ButtonStyle
	ariaLabel?: string
	disabled?: boolean
	loading?: boolean
}

export default function Button({
	name,
	onClick,
	className,
	style = 'solid',
	ariaLabel,
	disabled = false,
	loading = false,
	children,
}: ButtonProps) {
	return (
		<button
			type='button'
			name={name}
			onClick={onClick}
			aria-label={ariaLabel || name}
			disabled={disabled || loading}
			className={twMerge(
				'inline-flex items-center justify-center gap-2 px-4 h-10 rounded-md text-md cursor-pointer transition-colors duration-300 select-none',
				style == 'outline'
					? 'border border-gray-400 text-gray-300 hover:bg-gray-800'
					: 'bg-gray-800 text-gray-100 hover:bg-gray-700',
				disabled || loading ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
				className
			)}
		>
			{loading ? (
				<span className='animate-spin h-4 w-4 border-2 border-t-transparent rounded-full border-white' />
			) : (
				<span>{children ?? name}</span>
			)}
		</button>
	)
}
