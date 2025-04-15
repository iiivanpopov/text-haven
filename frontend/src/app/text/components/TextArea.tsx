'use client'

import { memo, useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

function TextArea({
	className,
	onChange,
	value,
}: {
	className?: string
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	value: string
}) {
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {
		const textarea = textareaRef.current
		if (textarea) {
			const scrollY = window.scrollY

			textarea.style.height = 'auto'
			textarea.style.height = textarea.scrollHeight + 'px'

			window.scrollTo({ top: scrollY })
		}
	}, [value])

	return (
		<textarea
			ref={textareaRef}
			rows={1}
			className={twMerge('outline-none min-h-40 resize-none', className)}
			onChange={onChange}
			value={value}
		/>
	)
}

export default memo(TextArea)
