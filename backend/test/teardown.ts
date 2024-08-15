import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function globalTeardown() {
	await prisma.$disconnect()
}
