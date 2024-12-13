import ApiError from '@exceptions/ApiError'

class Logger {
	private getTimestamp(): string {
		return new Date().toISOString()
	}

	log(data: unknown): void {
		console.log(`[${this.getTimestamp()}] [INFO]: ${data}`)
	}

	error(error: unknown): void {
		const timestamp = this.getTimestamp()

		if (error instanceof ApiError) {
			console.error(
				`[${timestamp}] [ERROR]: ${error.message} - Status: ${error.status}`
			)
		} else if (error instanceof Error) {
			console.error(
				`[${timestamp}] [ERROR]: ${error.message}\nStack: ${error.stack}`
			)
		} else {
			console.error(
				`[${timestamp}] [ERROR]: Unknown error: ${JSON.stringify(error)}`
			)
		}
	}
}

export default new Logger()
