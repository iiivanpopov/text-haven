import { twMerge } from 'tailwind-merge'

interface ButtonProps {
	name: string
	onClick: () => void
	className?: string
	style?: 'outline' | 'solid'
	ariaLabel?: string
}

export default function Button({
	onClick,
	ariaLabel,
	className,
	name,
	children,
}: React.PropsWithChildren<ButtonProps>) {
	return (
		<button
			name={name}
			onClick={onClick}
			className={twMerge(
				'transition-colors duration-300 h-10 w-64 cursor-pointer rounded-md text-gray-100 text-md',
				className
			)}
			aria-label={ariaLabel}
		>
			<span>{children || name}</span>
		</button>
	)
}
