import type { ValidationError } from 'express-validator'

type IError = Error | ValidationError
type IErrors = IError[]

class ApiError extends Error {
	status: number
	errors: IErrors

	constructor(status: number, message: string, errors: IErrors = []) {
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

	static BadRequest(message: string = 'Bad request', errors: IErrors = []) {
		return new ApiError(400, message, errors)
	}

	static NotFound(message: string = 'Not found', errors: IErrors = []) {
		return new ApiError(404, message, errors)
	}

	static Internal(message: string = 'Unexpected error', errors: IErrors = []) {
		return new ApiError(500, message, errors)
	}
}

export default ApiError
