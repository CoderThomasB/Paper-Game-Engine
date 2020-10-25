
/**
 * @enum {Number}
 */
globalThis.directions = {
	up: 1,
	right: 2,
	down: 3,
	left: 4,
}

/**
 * @param {number} direction
 * @returns {number}
 */
globalThis.get_opposite_direction = (direction) => {
	switch (direction) {
		case directions.up:
			return directions.down
			break
		case directions.down:
			return directions.up
			break
		case directions.left:
			return directions.right
			break
		case directions.right:
			return directions.left
			break
		default:
			throw new DirectionTypeError()
			break
	}
}

/**
 * @param {number} direction
 * @returns {location2D}
 */
globalThis.get_direction_as_location2D = (direction) => {
	switch (direction) {
		case directions.up:
			return new location2D(0, -1)
		case directions.down:
			return new location2D(0, 1)
		case directions.left:
			return new location2D(-1, 0)
		case directions.right:
			return new location2D(1, 0)
		default:
			throw new DirectionTypeError()
	}
}

globalThis.DirectionTypeError = class DirectionTypeError extends TypeError {
	constructor() {
		super()
		this.message = "Input is not a direction!"
	}
}