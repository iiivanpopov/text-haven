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
}

export default function Select({ name, options, className, onChange, value }: SelectProps) {
	return (
		<select
			onChange={onChange}
			name={name}
			value={value}
			id={name}
			className={twMerge(
				'text-primary-light dark:text-primary-dark transition-colors rounded-md px-5 border-2 border-outline-light dark:border-outline-dark focus:border-outline-dark-light dark:focus:border-outline-dark-dark outline-none w-64 h-[50px]',
				className
			)}
		>
			{Array.isArray(options) &&
				options.map(elem => (
					<option
						className='bg-background-secondary-light dark:bg-background-secondary-dark'
						key={elem.name}
						value={elem.value}
					>
						{elem.name}
					</option>
				))}
		</select>
	)
}
