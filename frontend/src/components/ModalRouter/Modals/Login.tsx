'use client'

import Button from '@components/shared/Button'
import Input from '@components/shared/Input'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import ModalWrapper from '../ModalWrapper'

export default function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const router = useRouter()
	const pathname = usePathname()

	return (
		<ModalWrapper
			onClose={() => {
				router.push(pathname)
			}}
		>
			<main className='flex justify-center items-center bg-gray-100 dark:bg-gray-950 p-10 rounded-md'>
				<div className='grid grid-rows-3 gap-y-5'>
					<div className='flex flex-col'>
						<span className='dark:text-gray-200 text-gray-700 text-md'>Username</span>
						<Input
							name={'username'}
							value={username}
							className='w-64'
							ariaLabel='Username input field'
							onChange={e => setUsername(e.target.value)}
						/>
					</div>
					<div className='flex flex-col'>
						<span className='dark:text-gray-200 text-gray-700 text-md'>Password</span>
						<Input
							name={'password'}
							value={password}
							className='w-64'
							ariaLabel='Password input field'
							type='password'
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<Button
						name={'Login'}
						className='self-end bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-600'
						ariaLabel='Login button'
						onClick={() => console.log('Login')}
					/>
				</div>
			</main>
		</ModalWrapper>
	)
}
