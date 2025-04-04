'use client'

import Button from '@components/Button'
import Input from '@components/Input'
import Link from 'next/link'
import { useState } from 'react'

export default function Login() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	return (
		<main className='flex justify-center items-center'>
			<div className='flex justify-between flex-col h-64'>
				<div className='flex flex-col gap-y-5'>
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
				</div>

				<div className='flex flex-col gap-y-3 items-center'>
					<Button
						name={'Login'}
						className='bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-600'
						ariaLabel='Login button'
						onClick={() => console.log('Login')}
					/>
					<Link href={'/register'} className='dark:text-gray-200 text-gray-700 text-sm'>
						Go to register
					</Link>
				</div>
			</div>
		</main>
	)
}
