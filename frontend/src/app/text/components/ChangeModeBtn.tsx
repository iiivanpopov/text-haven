import Button from '@components/shared/Button'
import { Check, Wrench } from 'lucide-react'
import { memo } from 'react'

const ChangeModeBtn = ({ mode, onClick }: { mode: 'edit' | 'read'; onClick: () => void }) => (
	<Button
		name='Configure'
		className='w-48 m-[0_auto]'
		onClick={() => {
			if (mode == 'edit') console.log('Some save logic')
			onClick()
		}}
	>
		{mode == 'read' ? <Wrench size={32} /> : <Check size={32} />}
	</Button>
)

export default memo(ChangeModeBtn)
