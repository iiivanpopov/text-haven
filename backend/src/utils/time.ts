type Unit = 'w' | 'd' | 'h' | 'm' | 's' | 'ms'
type UnitAnyCase = Uppercase<Unit> | Lowercase<Unit>
export type TimeType = `${number}${UnitAnyCase}`

export class Time {
	private static unitMultipliers: Record<string, number> = {
		w: 7 * 24 * 60 * 60 * 1000,
		d: 24 * 60 * 60 * 1000,
		h: 60 * 60 * 1000,
		m: 60 * 1000,
		s: 1000,
		ms: 1,
	}

	static mapToMilliseconds(time: TimeType): number {
		const match = time.match(/^(\d+)([a-zA-Z]+)$/)
		if (!match) return 0

		const [, valueStr, unitStr] = match
		const value = parseInt(valueStr, 10)
		const unit = unitStr.toLowerCase()

		if (unit === 'ms') {
			return value
		}

		const multiplier = this.unitMultipliers[unit]
		return multiplier ? value * multiplier : 0
	}
}
