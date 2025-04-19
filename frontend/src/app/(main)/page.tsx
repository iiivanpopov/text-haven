import MainSection from './components/MainSection'
import PostSection from './components/PostSection'

export default function Main() {
	return (
		<main className='mt-20 grid grid-cols-[5fr_2fr] gap-x-20'>
			<MainSection />

			<section className='flex flex-col justify-between'>
				<h3 className='text-5xl text-gray-800 dark:text-gray-100'>Latest posts</h3>
				<div className='mt-5 grid grid-rows-3 h-full gap-y-10'>
					<PostSection />
				</div>
			</section>
		</main>
	)
}
