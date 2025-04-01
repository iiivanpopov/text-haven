import Header from '@components/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Authorization | TextHaven',
	description: 'Register and login into your account',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='max-w-[1270px] m-[0_auto] font-urbanist grid grid-rows-[10vh_80vh]'>
			<Header />
			{children}
		</div>
	)
}
