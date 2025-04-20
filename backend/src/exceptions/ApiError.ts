import type { ValidationError } from 'express-validator'

type IncomingError = Error | ValidationError
type Errors = IncomingError[]

class ApiError extends Error {
	status: number
	errors: Errors

	constructor(status: number, message: string, errors: Errors = []) {
		super(message)
		this.status = status
		this.errors = errors
	}

	static BadRequest(message = 'Bad request', errors: Errors = []) {
		return new ApiError(400, message, errors)
	}

	static Unauthorized(message = 'Unauthorized') {
		return new ApiError(401, message)
	}

	static Forbidden(message = 'Forbidden') {
		return new ApiError(403, message)
	}

	static NotFound(message = 'Not found') {
		return new ApiError(404, message)
	}

	static Internal(message = 'Unexpected error') {
		return new ApiError(500, message)
	}
}

export default ApiError
