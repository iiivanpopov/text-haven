class ApiError extends Error {
	status: number
	errors: Error[]

	constructor(status: number, message: string, errors: Error[] = []) {
		super(message)
		this.status = status
		this.errors = errors
	}

	static Unauthorized() {
		return new ApiError(401, 'Not authenticated')
	}

	static Forbidden() {
		return new ApiError(403, 'No access')
	}

	static BadRequest(message: string, errors: Error[] = []) {
		return new ApiError(400, message, errors)
	}

	static NotFound(message: string, errors: Error[] = []) {
		return new ApiError(404, message, errors)
	}
}

export default ApiError
