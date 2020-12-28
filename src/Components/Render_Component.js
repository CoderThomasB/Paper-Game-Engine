import { Vector2 } from "../Math/Vector2"
import { Colour_Or_Img } from "../Enums"

class Render_Component {
	/**
	 * @param {Object} shape the shape of the component
	 * @param {String} colour the colour of the component
	 */
	constructor(shape, colour) {
		this.shape = shape
		this.offset = new Vector2(0, 0)
		this.use_colour_or_img = Colour_Or_Img.colour
		this.colour = colour
		this.img = undefined
	}
	before_draw() {

	}
}

export { Render_Component }