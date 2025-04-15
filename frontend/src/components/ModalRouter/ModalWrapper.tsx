'use client'

import { twMerge } from 'tailwind-merge'

interface ModalProps {
	className?: string
	onClose: () => void
}

export default function ModalWrapper({
	children,
	className,
	onClose,
}: React.PropsWithChildren<ModalProps>) {
	return (
		<div
			className='fixed inset-0 bg-black/50 overflow-y-auto h-full w-full flex items-center justify-center z-60'
			onClick={e => {
				if (e.target == e.currentTarget) onClose()
			}}
		>
			<div className={twMerge('z-70', className)} onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	)
}
