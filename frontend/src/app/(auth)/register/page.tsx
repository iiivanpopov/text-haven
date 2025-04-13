'use client'

import Button from '@components/shared/Button'
import Input from '@components/shared/Input'
import Link from 'next/link'
import { useState } from 'react'

export default function Register() {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
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
						<span className='dark:text-gray-200 text-gray-700 text-md'>Email</span>
						<Input
							name={'email'}
							value={email}
							className='w-64'
							ariaLabel='Email input field'
							onChange={e => setEmail(e.target.value)}
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
				<div className='flex flex-col gap-y-3 items-center mt-5'>
					<Button
						name={'Register'}
						className='bg-blue-400 dark:bg-blue-500 hover:bg-blue-500 dark:hover:bg-blue-600'
						ariaLabel='Register button'
						onClick={() => console.log('Register')}
					/>
					<Link href={'/login'} className='dark:text-gray-200 text-gray-700 text-sm'>
						Go to login
					</Link>
				</div>
			</div>
		</main>
	)
}
