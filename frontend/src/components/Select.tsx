import { twMerge } from 'tailwind-merge'

interface SelectProps {
	value: string
	className?: string
	name: string
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
	placeholder?: string
	options: {
		name: string
		value: string
	}[]
	ariaLabel?: string
}

export default function Select({
	name,
	ariaLabel,
	options,
	className,
	onChange,
	value,
}: SelectProps) {
	return (
		<select
			onChange={onChange}
			name={name}
			value={value}
			id={name}
			aria-label={ariaLabel}
			className={twMerge(
				'duration-300 bg-gray-100 dark:bg-gray-950 text-gray-700 text-md dark:text-gray-300 cursor-pointer transition-colors rounded-md outline-none h-10',
				className
			)}
		>
			{Array.isArray(options) &&
				options.map(elem => (
					<option key={elem.name} value={elem.value}>
						{elem.name}
					</option>
				))}
		</select>
	)
}
