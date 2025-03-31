import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Profile | TextHaven',
	description: 'Manage and edit your account here',
}

export default function ({ children }: { children: React.ReactNode }) {
	return <>{children}</>
}
