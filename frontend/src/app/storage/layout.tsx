import Footer from '@components/Footer/Footer'
import Header from '@components/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'TextHaven | Storage',
	description: 'Storage of your texts',
}

export default function StorageLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='max-w-[1270px] m-[0_auto] font-urbanist grid grid-rows-[10vh_auto]'>
			<Header />
			{children}
			<Footer />
		</div>
	)
}
