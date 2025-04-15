'use client'

import { Login, Register } from '@components/Modals'
import Button from '@components/shared/Button'
import { useRouter, useSearchParams } from 'next/navigation'

// temporary
const isAuth = false

export default function Footer() {
	const router = useRouter()

	const searchParams = useSearchParams()
	const modal = searchParams.get('modal')

	// Show only when not authorized

	return (
		!isAuth && (
			<div className='fixed bottom-0 h-[5vh] flex gap-x-10 w-screen'>
				<Button name='Login' className='w-48' onClick={() => router.push('?modal=login')} />
				<Button name='Register' className='w-24' onClick={() => router.push('?modal=register')} />

				{modal == 'login' ? <Login /> : modal ? <Register /> : <></>}
			</div>
		)
	)
}
