import { memo } from 'react'
import Content from './Content'
import Title from './Title'

function ReadMode({ title, content }: { title: string; content: string }) {
	return (
		<>
			<Title title={title} />
			<Content content={content} />
		</>
	)
}

export default memo(ReadMode)
