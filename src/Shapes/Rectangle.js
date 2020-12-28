import { Vector2 } from "../Math/Vector2"

class Rectangle {
	/**
	 * @param {Vector2} size the size of the rectangle in width and height
	 */
	constructor(size) {
		if (size === undefined) {
			size = new Vector2(1, 1)
		} else {
			this.size = size
		}
	}

	get_animatable_attributes() {
		return ["shape.size.x", "shape.size.y"]
	}
	set_animatable_attributes(key, value) {
		if (value === undefined) {
			return
		}

		if (key === "shape.size.x") {
			this.size.x = value
		}

		if (key === "shape.size.y") {
			this.size.y = value
		}
	}
}

export { Rectangle }