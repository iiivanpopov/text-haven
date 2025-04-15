import Input from '@components/shared/Input'
import { memo } from 'react'
import TextArea from './TextArea'

function EditMode({
	title,
	content,
	setTitle,
	setContent,
}: {
	title: string
	content: string
	setTitle: (value: string) => void
	setContent: (value: string) => void
}) {
	return (
		<>
			<Input
				name='Title'
				className='text-gray-800 dark:text-gray-100 text-4xl w-10/12 p-0'
				value={title}
				onChange={e => setTitle(e.target.value)}
			/>
			<TextArea
				onChange={e => setContent(e.target.value)}
				value={content}
				className='text-xl w-10/12 overflow-hidden'
			/>
		</>
	)
}

export default memo(EditMode)
