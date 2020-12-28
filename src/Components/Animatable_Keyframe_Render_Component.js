import { Render_Component } from "./Render_Component"

class Animatable_Keyframe_Render_Component extends Render_Component {
	/**
	 * 
	 * @param {Object} shape the shape of the component
	 * @param {String} colour the colour of the component
	 * @param {Animation} animation 
	 * @param {boolean} play_on_creation 
	 */
	constructor(shape, colour, animation, play_on_creation = false) {
		super(shape, colour)
		this.animation = animation
		if (play_on_creation) {
			this.play()
		} else {
			this.stop()
		}
	}
	play() {
		this.last_time = Date.now()
		this.is_playing = true
		this.animation.goto_start()
	}
	stop() {
		this.is_playing = false
	}
	before_draw() {
		if (this.is_playing === false) { return }
		if (this.animation.now > this.animation.end) { stop(); return }
		let now = Date.now()
		let delta_time = now - this.last_time
		this.animation.now += delta_time
		this.last_time = now

		let offset_x = this.animation.get_attribute_value_now("offset.x")
		let offset_y = this.animation.get_attribute_value_now("offset.y")

		let use_colour_or_img = this.animation.get_attribute_value_now("use_colour_or_img")

		let colour = this.animation.get_attribute_value_now("colour")
		let img = this.animation.get_attribute_value_now("img")

		if (offset_x != undefined) { this.offset.x = offset_x }
		if (offset_y != undefined) { this.offset.y = offset_y }

		if (use_colour_or_img != undefined) { this.use_colour_or_img = use_colour_or_img }

		if (colour != undefined) { this.colour = colour }

		if (img != undefined) { this.img = img }

		this.shape.get_animatable_attributes().forEach((attribute) => {
			let _ = this.animation.get_attribute_value_now(attribute)
			this.shape.set_animatable_attributes(attribute, _)
		})
	}
}

export { Animatable_Keyframe_Render_Component }