import { twMerge } from 'tailwind-merge'

interface Option {
	name: string
	value: string
}

interface SelectProps {
	value: string
	name: string
	options: Option[]
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
	placeholder?: string
	ariaLabel?: string
	className?: string
}

export default function Select({
	value,
	name,
	options,
	onChange,
	placeholder,
	ariaLabel,
	className,
}: SelectProps) {
	return (
		<select
			id={name}
			name={name}
			value={value}
			onChange={onChange}
			aria-label={ariaLabel || name}
			className={twMerge(
				'h-10 rounded-md bg-gray-100 dark:bg-gray-950 text-md text-gray-700 dark:text-gray-300 outline-none transition-colors duration-300 cursor-pointer',
				className
			)}
		>
			{placeholder && (
				<option value='' disabled hidden>
					{placeholder}
				</option>
			)}

			{options.map(({ name, value }) => (
				<option key={value} value={value}>
					{name}
				</option>
			))}
		</select>
	)
}
