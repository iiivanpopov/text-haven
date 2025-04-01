'use client'

import Button from '@components/Button'
import Input from '@components/Input'
import { useState } from 'react'

export default function ProfileSettings() {
	const [username, setUsername] = useState<string>('')
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')

	return (
		<main className='mt-20 h-[25vh] flex flex-col gap-y-10 w-[450px]'>
			<div className='flex gap-y-15 flex-col'>
				<div className='flex flex-col gap-y-8'>
					<Input
						className='h-[75px]'
						name='username'
						placeholder='Name'
						value={username}
						ariaLabel='Username input'
						onChange={e => setUsername(e.target.value)}
					/>
					<Input
						className='h-[75px]'
						name='email'
						placeholder='Email'
						value={email}
						ariaLabel='Email input'
						onChange={e => setEmail(e.target.value)}
					/>
					<Input
						className='h-[75px]'
						name='password'
						ariaLabel='Password input'
						placeholder='Password'
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
				</div>
				<Button
					name='Save'
					ariaLabel='Save your profile'
					className='bg-green-light dark:bg-green-dark h-[50px] hover:bg-green-dark-light dark:hover:bg-green-dark-dark w-full'
					onClick={() => console.log('Save profile')}
				/>
			</div>
		</main>
	)
}
