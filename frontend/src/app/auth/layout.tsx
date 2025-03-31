import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Authorization | TextHaven',
	description: 'Register and login into your account',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
	return <>{children}</>
}
