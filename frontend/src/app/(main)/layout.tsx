import Footer from '@components/Footer'
import Header from '@components/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'TextHaven',
	description: 'An app to share and post texts',
}

export default function MainLayout({ children }: React.PropsWithChildren) {
	return (
		<div className='max-w-[1270px] m-[0_auto] grid grid-rows-[10vh_minmax(80vh,auto)]'>
			<Header />
			{children}
			<Footer />
		</div>
	)
}
