import { Base } from "./Base"
import { Render_Component } from "../Components/Render_Component"
import { Vector2 } from "../Math/Vector2"
import { Rectangle } from "../Shapes/Rectangle"

class Visible extends Base {
	/**
	 * this function is called just before the object is drawn
	 */
	before_draw() {

	}
	/**
	 * @param {world} The_Container the world that the object is in.
	 * @param {Vector2} New_location the location of the object.
	 */
	constructor(The_Container, New_location) {
		super(The_Container, New_location)

		this.visible =
			[new Render_Component(
				new Rectangle(new Vector2(1, 1)),
				"hsl(0, 0%, 80%)"
			)
			]
	}
}

export { Visible }