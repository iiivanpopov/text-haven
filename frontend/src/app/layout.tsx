import './globals.css'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className='bg-background-primary'>{children}</body>
		</html>
	)
}
