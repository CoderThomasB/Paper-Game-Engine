
globalThis.location2D = class location2D {
	/**
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(x = Number.NaN, y = Number.NaN) {
		this.x = x
		this.y = y
	}

	/**
	 * @param {location2D} other
	 * @returns {location2D}
	 */
	is_equal(other) {
		return other.x == this.x && other.y == this.y
	}
	/**
	 * @param {location2D} other
	 * @returns {location2D}
	 */
	add(other) {
		return new location2D(this.x + other.x, this.y + other.y)
	}
	/**
	 * @param {location2D} other
	 * @returns {location2D}
	 */
	subtract(other) {
		return new location2D(this.x - other.x, this.y - other.y)
	}
	/**
	 * @param {location2D} other
	 * @returns {location2D}
	 */
	min(other) {
		return new location2D(Math.min(this.x, other.x), Math.min(this.y, other.y))
	}
	/**
	 * @param {location2D} other
	 * @returns {location2D}
	 */
	max(other) {
		return new location2D(Math.max(this.x, other.x), Math.max(this.y, other.y))
	}
	/**
	 * @param {location2D} other
	 * @returns {location2D}
	 */
	mack_copy() {
		return new location2D(this.x, this.y)
	}
	/**
	 * @param {location2D} other
	 * @returns {location2D}
	 */
	toString() {
		return `{"x": ${this.x},"y": ${this.y}}`
	}
}
