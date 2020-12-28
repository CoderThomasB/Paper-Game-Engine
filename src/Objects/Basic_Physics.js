import { Visible } from "./Visible"
import { check } from "../Physics"
import { Get_Direction_As_Vector2, Get_Opposite_Direction } from "../Math/Directions"

class Basic_Physics extends Visible {
	/**
	 * moves the object in a direction but not in to solid object (triggers an update)
	 * @param {Number} direction the location of the object.
	 */
	move(direction) {
		this.location.add(Get_Direction_As_Vector2(direction))
		if (!check(this.location, this.Containing_World, this)) {
			//console.log("INVALID MOVE")
			this.move(Get_Opposite_Direction(direction))
			return false
		}
		this.Containing_World.update()
		return true
	}
	/**
	 * @param {world} The_Container the Container this the object is in.
	 * @param {Vector2} New_location the location of the object.
	 */
	constructor(The_Container, New_location) {
		super(The_Container, New_location)
		this.physics = {
			solid: true
		}
	}

}

export { Basic_Physics }