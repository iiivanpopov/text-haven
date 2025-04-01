import { calculateTimeAgo } from '@utils/time'

interface PostDateProps {
	date: Date
}

export default function PostDate({ date }: PostDateProps) {
	return <span className='text-muted text-sm'>{calculateTimeAgo(date)}</span>
}
