import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
	title: 'TextHaven',
	description: 'An app to share texts',
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body>{children}</body>
		</html>
	)
}
