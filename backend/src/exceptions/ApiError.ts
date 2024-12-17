import type { ValidationError } from 'express-validator'

type Errors = Error[] | ValidationError[]

class ApiError extends Error {
	status: number
	errors: Errors

	constructor(status: number, message: string, errors: Errors = []) {
		super(message)
		this.status = status
		this.errors = errors
	}

	static Unauthorized() {
		return new ApiError(401, 'Unauthorized')
	}

	static Forbidden() {
		return new ApiError(403, 'Forbidden')
	}

	static BadRequest(message: string = 'Bad request', errors: Errors = []) {
		return new ApiError(400, message, errors)
	}

	static NotFound(message: string = 'Not found', errors: Errors = []) {
		return new ApiError(404, message, errors)
	}

	static Internal(message: string = 'Unexpected error', errors: Errors = []) {
		return new ApiError(500, message, errors)
	}
}

export default ApiError
