import { lazy, Suspense } from 'react'
import './globals.css'

const LazyModalRouter = lazy(() => import('@components/ModalRouter'))

export default async function Layout({ children }: React.PropsWithChildren) {
	return (
		<html lang='en'>
			<body className='bg-gray-100 dark:bg-gray-950 min-h-screen text-gray-800 dark:text-gray-100 font-urbanist'>
				{children}
				<Suspense fallback={null}>
					<LazyModalRouter />
				</Suspense>
			</body>
		</html>
	)
}
