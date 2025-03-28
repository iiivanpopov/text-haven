type Unit = 'w' | 'd' | 'h' | 'm' | 's' | 'ms'
type UnitAnyCase = Uppercase<Unit> | Lowercase<Unit>
export type TimeType = `${number}${UnitAnyCase}`

export class Time {
	static mapToMilliseconds(time: TimeType): number {
		const lowerTime = time.toLowerCase()
		const value = parseInt(time, 10)

		switch (true) {
			case lowerTime.endsWith('w'):
				return value * 7 * 24 * 60 * 60 * 1000
			case lowerTime.endsWith('d'):
				return value * 24 * 60 * 60 * 1000
			case lowerTime.endsWith('h'):
				return value * 60 * 60 * 1000
			case lowerTime.endsWith('m'):
				return value * 60 * 1000
			case lowerTime.endsWith('s'):
				return value * 1000
			case lowerTime.endsWith('ms'):
				return value
			default:
				return 0
		}
	}
}
