class Text_Shape {
	/**
	 * @param {String} text the text that will be displayed
	 * @param {Number} size one of the dimension of the text
	 * @param {"height" | "width"} sizeType choses which dimension the is of
	 * @param {"left" | "right" | "center" | "start" | "end"} textAlign
	 * 
	 * you can not set height and width only one
	 */
	constructor(text, size, sizeType, textAlign = "start") {
		this.text = text
		this.textAlign = textAlign
		if (sizeType === "height") {
			this.set_height(size)
		} else if (sizeType === "width") {
			this.set_width(size)
		} else {
			this.set_height(0.5)
		}
	}
	set_height(value) {
		console.log("height")
		this.size = "height"
		this.height = value
	}
	set_width(value) {
		console.log("width")
		this.size = "width"
		this.width = value
	}

	get_animatable_attributes() {
		return ["shape.text", "shape.textAlign", "shape.sizeType", "shape.size"]
	}
	set_animatable_attributes(key, value) {
		if (value === undefined) {
			return
		}

		if (key === "shape.text" && value.constructor === String) {
			this.text = value
		}

		if (key === "shape.textAlign" && value.constructor === String) {
			this.textAlign = value
		}

		if (key === "shape.sizeType" && value.constructor === String) {
			if (value === "height" || value === "width") {
				this.size = value
			}
		}

		if (key === "shape.size" && value.constructor === Number) {
			if (this.size == "width") {
				this.width = value
			} else {
				this.height = value
			}
		}
	}
}

export { Text_Shape }