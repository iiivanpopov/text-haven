export const truncate = (text: string, max = 40) =>
	text.length > max ? text.slice(0, max) + '...' : text
