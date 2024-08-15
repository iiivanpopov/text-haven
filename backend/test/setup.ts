import { execSync } from 'child_process'

export default async function globalSetup() {
	execSync(
		'npx prisma migrate reset --force --schema=prisma/schema.test.prisma'
	)
}
