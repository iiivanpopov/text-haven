import File from './components/File'
import Folder from './components/Folder'

const folders = ['Folder 1', 'Folder 2', 'Folder 3', 'Folder 4', 'Folder 5']
const files = ['File 1', 'File 2', 'File 3', 'File 4']

export default function Storage() {
	// TODO: GRID/LIST items layout & Search | Filter
	return (
		<main className='mt-20 grid w-3/5'>
			<h3 className='text-5xl text-gray-800 dark:text-gray-100'>Storage</h3>
			{folders.map(elem => (
				<Folder folderId={elem} key={elem} title={elem} />
			))}
			{files.map(elem => (
				<File key={elem} fileId={elem} title={elem} />
			))}
		</main>
	)
}
