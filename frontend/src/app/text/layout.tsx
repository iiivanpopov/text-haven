import Footer from '@components/Footer/Footer'
import Header from '@components/Header'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'TextHaven | Text',
	description: 'Page with text',
}

export default function TextLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='max-w-[1270px] m-[0_auto] font-urbanist grid grid-rows-[10vh_80vh]'>
			<Header />
			{children}
			<Footer />
		</div>
	)
}
