import ModalRouter from '@components/ModalRouter'
import './globals.css'

export default async function Layout({ children }: React.PropsWithChildren) {
	return (
		<html lang='en'>
			<body className='bg-gray-100 dark:bg-gray-950 min-h-screen text-gray-800 dark:text-gray-100 font-urbanist'>
				{children}
				<ModalRouter />
			</body>
		</html>
	)
}
