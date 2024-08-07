import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export const connect = async () => await prisma.$connect()
export const disconnect = async () => await prisma.$disconnect()
