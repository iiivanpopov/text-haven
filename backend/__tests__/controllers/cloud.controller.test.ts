// import { PrismaClient, User } from '@prisma/client'
// import { TokenService } from '@services'
// import { connect, disconnect } from '@utils'
// import request from 'supertest'
// import { v4 } from 'uuid'
// import app from '../../src/app'

// const prisma = new PrismaClient()
// const tokenService = new TokenService()

// describe('Cloud Controller', () => {
// 	let accessToken: string
// 	let user: User
// 	const bucket = 'bucket' + v4()

// 	beforeAll(async () => {
// 		await connect()

// 		user = await prisma.user.create({
// 			data: {
// 				email: 'test@example.com',
// 				password: 'password123',
// 				activationLink: 'null',
// 			},
// 		})
// 		accessToken = (
// 			await tokenService.generateTokens({
// 				email: user.email,
// 				id: user.id,
// 				role: user.role,
// 			})
// 		).accessToken
// 	})

// 	afterAll(async () => {
// 		await prisma.file.deleteMany({ where: { userId: user.id } })
// 		await prisma.bucket.deleteMany({ where: { userId: user.id } })
// 		await prisma.user.delete({ where: { id: user.id } })
// 		await prisma.token.delete({ where: { userId: user.id } })
// 		await disconnect()
// 	})

// 	it('should create a bucket successfully', async () => {
// 		const response = await request(app)
// 			.post('/api/buckets')
// 			.set('Authorization', `Bearer ${accessToken}`)
// 			.send({
// 				bucket,
// 			})

// 		expect(response.status).toBe(201)
// 	})

// 	it('should get all buckets for a user', async () => {
// 		const response = await request(app)
// 			.get('/api/buckets')
// 			.set('Authorization', `Bearer ${accessToken}`)

// 		expect(response.status).toBe(200)
// 		expect(response.body.buckets).toHaveLength(1)
// 	})

// 	it('should create a file successfully', async () => {
// 		const response = await request(app)
// 			.post('/api/files')
// 			.set('Authorization', `Bearer ${accessToken}`)
// 			.send({
// 				bucket,
// 				name: 'test.txt',
// 				content: 'data',
// 				exposure: 'PUBLIC',
// 				expiresAt: '2025-08-14T14:46:28.333Z',
// 			})

// 		expect(response.status).toBe(201)
// 	})

// 	it('should get a file by name', async () => {
// 		const response = await request(app)
// 			.get('/api/files/test.txt')
// 			.send({
// 				bucket,
// 			})
// 			.set('Authorization', `Bearer ${accessToken}`)

// 		expect(response.status).toBe(200)
// 		expect(response.body.name).toBe('test.txt')
// 	})

// 	it('should delete a file successfully', async () => {
// 		const response = await request(app)
// 			.delete('/api/files/test.txt')
// 			.set('Authorization', `Bearer ${accessToken}`)
// 			.send({
// 				bucket,
// 			})

// 		expect(response.status).toBe(204)
// 	})

// 	it('should delete a bucket successfully', async () => {
// 		const response = await request(app)
// 			.delete(`/api/buckets/${bucket}`)
// 			.set('Authorization', `Bearer ${accessToken}`)

// 		expect(response.status).toBe(204)
// 	})
// })
