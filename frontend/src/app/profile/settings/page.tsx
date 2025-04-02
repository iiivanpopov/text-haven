'use client'

import Button from '@components/Button'
import Input from '@components/Input'
import Select from '@components/Select'
import { useState } from 'react'

export default function ProfileSettings() {
	const [username, setUsername] = useState<string>('My name')
	const [email, setEmail] = useState<string>('username@gmail.com')
	const [password, setPassword] = useState<string>('12345678')
	const [profileAccessability, setProfileAccessability] = useState<string>('Public')

	return (
		<main className='mt-20 h-[25vh] flex flex-col gap-y-10 w-[450px]'>
			<div className='flex gap-y-15 flex-col'>
				<div className='flex flex-col gap-y-8'>
					<div>
						<h4 className='text-primary-light dark:text-primary-dark text-[1.2rem]'>Username</h4>
						<Input
							className='h-[75px] w-full'
							name='username'
							placeholder='Name'
							value={username}
							ariaLabel='Username input'
							onChange={e => setUsername(e.target.value)}
						/>
					</div>
					<div>
						<h4 className='text-primary-light dark:text-primary-dark text-[1.2rem]'>Email</h4>
						<Input
							className='h-[75px] w-full'
							name='email'
							placeholder='Email'
							value={email}
							ariaLabel='Email input'
							onChange={e => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<h4 className='text-primary-light dark:text-primary-dark text-[1.2rem]'>Password</h4>
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
					<div>
						<h4 className='text-primary-light dark:text-primary-dark text-[1.2rem]'>
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
					className='bg-green-light dark:bg-green-dark h-[50px] hover:bg-green-dark-light dark:hover:bg-green-dark-dark w-full'
					onClick={() => console.log('Save profile')}
				/>
			</div>
		</main>
	)
}
