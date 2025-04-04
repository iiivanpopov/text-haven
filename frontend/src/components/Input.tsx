import type { HTMLInputTypeAttribute } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps {
	type?: HTMLInputTypeAttribute
	name: string
	className?: string
	value: string
	ariaLabel?: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	placeholder?: string
}

export default function Input({
	value,
	placeholder,
	name,
	type = 'text',
	onChange,
	className,
	ariaLabel,
}: InputProps) {
	return (
		<input
			className={twMerge(
				'transition-colors outline-none rounded-md px-5 bg-gray-100 text-md dark:bg-gray-950 text-gray-700 dark:text-gray-300 text-md h-10',
				className
			)}
			aria-label={ariaLabel}
			type={type}
			name={name}
			id={name}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
		/>
	)
}
