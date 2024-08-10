import { prisma } from '@helpers/database'
import cron from 'node-cron'

cron.schedule('0 0 * * *', async () => {
	try {
		const now = Math.floor(Date.now() / 1000)

		await prisma.temporaryLink.deleteMany({
			where: {
				expiration: {
					lt: now,
				},
			},
		})
		console.log('Expired temporary links deleted successfully')
	} catch (error) {
		console.error('Error deleting expired temporary links:', error)
	}
})
