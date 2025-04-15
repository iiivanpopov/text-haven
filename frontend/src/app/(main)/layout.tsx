import Footer from '@components/Footer/Footer'
import Header from '@components/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'TextHaven',
	description: 'An app to share and post texts',
}

export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='max-w-[1270px] m-[0_auto] font-urbanist grid grid-rows-[10vh_80vh]'>
			<Header />
			{children}
			<Footer />
		</div>
	)
}
