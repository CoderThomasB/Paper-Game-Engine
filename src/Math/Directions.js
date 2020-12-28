import { Vector2 } from "./Vector2"
import { Directions } from "../Enums"

class DirectionTypeError extends TypeError {
	constructor() {
		super()
		this.message = "Input is not a direction!"
	}
}

/**
 * @param {number} Direction
 * @returns {Vector2}
 */
function Get_Direction_As_Vector2(Direction) {
	switch (Direction) {
		case Directions.Up:
			return new Vector2(0, -1)
		case Directions.Down:
			return new Vector2(0, 1)
		case Directions.Left:
			return new Vector2(-1, 0)
		case Directions.Right:
			return new Vector2(1, 0)
		default:
			throw new DirectionTypeError()
	}
}

/**
 * @param {number} Direction
 * @returns {number}
 */
function Get_Opposite_Direction(Direction) {
	switch (Direction) {
		case Directions.Up:
			return Directions.Down
			break
		case Directions.Down:
			return Directions.Up
			break
		case Directions.Left:
			return Directions.Right
			break
		case Directions.Right:
			return Directions.Left
			break
		default:
			throw new DirectionTypeError()
			break
	}
}

export {Get_Opposite_Direction, Get_Direction_As_Vector2, Directions, DirectionTypeError}