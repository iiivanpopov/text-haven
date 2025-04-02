import { twMerge } from 'tailwind-merge'

interface ButtonProps {
	name: string
	onClick: () => void
	className?: string
	ariaLabel?: string
}

export default function Button({ onClick, ariaLabel, className, name }: ButtonProps) {
	return (
		<button
			onClick={onClick}
			className={twMerge(
				'transition-colors h-[50px] w-64 cursor-pointer rounded-md text-white text-[1.2rem]',
				className
			)}
			aria-label={ariaLabel}
		>
			{name}
		</button>
	)
}
