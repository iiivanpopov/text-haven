import type { HTMLInputTypeAttribute } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps {
	type?: HTMLInputTypeAttribute
	name: string
	className?: string
	value: string
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
}: InputProps) {
	return (
		<input
			className={twMerge(
				'transition-colors outline-none rounded-md px-5 bg-background-secondary-light dark:bg-background-secondary-dark border-outline-light dark:border-outline-dark border-2 text-secondary text-body h-10 focus:border-outline-dark-light dark:focus:border-outline-dark-dark text-primary-light dark:text-primary-dark',
				className
			)}
			type={type}
			name={name}
			id={name}
			placeholder={placeholder || ''}
			value={value}
			onChange={onChange}
		/>
	)
}
