import Link from 'next/link'

export default function PostTitle({ title, id }: { id: string; title: string }) {
	return (
		<Link href={`/text/${id}`}>
			<h4 className='text-primary text-card font-semibold'>{title}</h4>
		</Link>
	)
}
