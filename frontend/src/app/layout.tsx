import { ThemeProvider } from 'next-themes'
import './globals.css'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body>
				<ThemeProvider attribute='data-theme' enableSystem>
					<div className='h-screen v-screen bg-gray-100 dark:bg-gray-950'>{children}</div>
				</ThemeProvider>
			</body>
		</html>
	)
}
