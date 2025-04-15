import MainBlock from './components/MainBlock'
import PostSection from './components/PostSection'

export default function Main() {
	return (
		<main className='mt-20 grid grid-cols-[5fr_2fr] gap-x-20 h-[80%]'>
			<MainBlock />
			<PostSection />
		</main>
	)
}
