import './globals.css'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body>
				<div className='bg-gray-100 dark:bg-gray-950 min-h-screen text-gray-800 dark:text-gray-100'>
					{children}
				</div>
			</body>
		</html>
	)
}
