'use client'

import Button from '@components/shared/Button'
import Input from '@components/shared/Input'
import Select from '@components/shared/Select'
import { useState } from 'react'

export default function ProfileSettings() {
	const [username, setUsername] = useState<string>('My name')
	const [email, setEmail] = useState<string>('username@gmail.com')
	const [password, setPassword] = useState<string>('12345678')
	const [profileAccessability, setProfileAccessability] = useState<string>('Public')

	return (
		<main className='mt-20 h-[25vh] flex flex-col gap-y-10'>
			<div className='flex gap-y-5 flex-col'>
				<div className='flex flex-col gap-y-4'>
					<div className='w-64'>
						<h4 className='text-gray-800 dark:text-gray-100 text-md font-semibold'>Username</h4>
						<Input
							className='h-[75px] w-full'
							name='username'
							placeholder='Name'
							value={username}
							ariaLabel='Username input'
							onChange={e => setUsername(e.target.value)}
						/>
					</div>
					<div className='w-64'>
						<h4 className='text-gray-800 dark:text-gray-100 text-md font-semibold'>Email</h4>
						<Input
							className='h-[75px] w-full'
							name='email'
							placeholder='Email'
							value={email}
							ariaLabel='Email input'
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div className='w-64'>
						<h4 className='text-gray-800 dark:text-gray-100 text-md font-semibold'>Password</h4>
						<Input
							className='h-[75px] w-full'
							name='password'
							ariaLabel='Password input'
							placeholder='Password'
							value={password}
							type='password'
							onChange={e => setPassword(e.target.value)}
						/>
					</div>
					<div className='w-64'>
						<h4 className='text-gray-800 dark:text-gray-100 text-md font-semibold'>
							Profile accessability
						</h4>
						<Select
							className='h-[75px] w-full'
							name='Change profile accessability'
							value={profileAccessability}
							ariaLabel='Profile accessability input'
							onChange={e => {
								setProfileAccessability(e.target.value)
							}}
							options={[
								{ name: 'Public', value: 'public' },
								{ name: 'Private', value: 'private' },
							]}
						/>
					</div>
				</div>
				<Button
					name='Save'
					ariaLabel='Save your profile'
					className='bg-green-400 dark:bg-green-500 h-12 w-64 text-xl hover:bg-green-500 dark:hover:bg-green-600'
					onClick={() => console.log('Save profile')}
				/>
			</div>
		</main>
	)
}
