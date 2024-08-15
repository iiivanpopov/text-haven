import request from 'supertest'
import app from '../../src/app'

describe('User Routes', () => {
	let refreshToken: string

	test('Register with valid data', async () => {
		const res = await request(app).post('/api/register').send({
			email: 'valid@example.com',
			password: 'password123',
			role: 'USER',
		})
		expect(res.status).toBe(200)
		expect(res.body).toHaveProperty('refreshToken')
		expect(res.body).toHaveProperty('accessToken')
		expect(res.body).toHaveProperty('user')
		expect(res.body.user).toHaveProperty('email', 'valid@example.com')
		refreshToken = res.body.refreshToken
	})

	test('Register with invalid data', async () => {
		const res = await request(app).post('/api/register').send({
			email: 'invalid-email',
			password: '',
		})
		expect(res.status).toBe(422)
		expect(res.body.errors).toBeDefined()
	})

	test('Login with valid credentials', async () => {
		const res = await request(app).post('/api/login').send({
			email: 'valid@example.com',
			password: 'password123',
		})
		expect(res.status).toBe(200)
		expect(res.body).toHaveProperty('refreshToken')
		expect(res.body).toHaveProperty('accessToken')
		expect(res.body).toHaveProperty('user')
		expect(res.body.user).toHaveProperty('email', 'valid@example.com')
	})

	test('Login with invalid credentials', async () => {
		const res = await request(app).post('/api/login').send({
			email: 'valid@example.com',
			password: 'wrongpassword',
		})
		expect(res.status).toBe(400)
		expect(res.body.message).toBe('Incorrect password')
	})

	test('Refresh token with valid refresh token', async () => {
		const res = await request(app)
			.get('/api/refresh')
			.set('Cookie', `refreshToken=${refreshToken}`)
		expect(res.status).toBe(200)
		expect(res.body).toHaveProperty('refreshToken')
		expect(res.body).toHaveProperty('accessToken')
		expect(res.body).toHaveProperty('user')
	})

	test('Refresh token without valid cookie', async () => {
		const res = await request(app).get('/api/refresh')
		expect(res.status).toBe(401)
		expect(res.body.message).toBe('Not authenticated')
	})
})
