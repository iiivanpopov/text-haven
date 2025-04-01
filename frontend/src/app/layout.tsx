import { ThemeProvider } from 'next-themes'
import './globals.css'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body>
				<ThemeProvider attribute='data-theme' enableSystem>
					<div className='h-screen v-screen bg-background-primary-light dark:bg-background-primary-dark'>
						{children}
					</div>
				</ThemeProvider>
			</body>
		</html>
	)
}
