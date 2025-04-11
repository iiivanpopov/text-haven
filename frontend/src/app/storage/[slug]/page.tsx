'use client'

import File from '@components/File'
import Folder from '@components/Folder'
import { usePathname } from 'next/navigation'

const fakeFileSystem: Record<
	string,
	{ folders?: { name: string; id: string }[]; files: string[] }
> = {
	'': {
		folders: [
			{ name: 'Folder A', id: 'a' },
			{ name: 'Folder B', id: 'b' },
		],
		files: ['Root File 1', 'Root File 2'],
	},
	a: {
		folders: [{ name: 'Folder C', id: 'c' }],
		files: ['File 1', 'File 2'],
	},
	b: {
		files: ['File 3', 'File 4'],
	},
	c: {
		files: ['File 5', 'File 6'],
	},
}

export default function Storage() {
	const pathname = usePathname()
	const folderId = pathname.split('/')[2] ?? ''

	const data: { folders?: { name: string; id: string }[]; files: string[] } = fakeFileSystem[
		folderId
	] ?? { folders: [], files: [] }

	// FIXME: Not an efficient way(AT ALL)
	const currentFolder = Object.values(fakeFileSystem)
		.map(value => value.folders?.find(val => val.id == folderId))
		.find(folder => folder != undefined)

	return (
		<main className='mt-20 w-3/5'>
			<h3 className='mb-5 text-5xl text-gray-800 dark:text-gray-100'>
				Storage | {currentFolder ? currentFolder.name : 'Root'}
			</h3>
			{data.folders?.map(folder => (
				<Folder key={folder.id} folderId={folder.id} className='px-5' title={folder.name} />
			))}

			{data.files.map(fileName => (
				<File key={fileName} className='px-5' fileId={fileName} title={fileName} />
			))}
		</main>
	)
}
