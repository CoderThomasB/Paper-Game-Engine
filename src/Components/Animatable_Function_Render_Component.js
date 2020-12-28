import { Render_Component } from "./Render_Component"

class Animatable_Function_Render_Component extends Render_Component {
	/**
	 * 
	 * @param {Object} shape the shape of the component
	 * @param {String} colour the colour of the component
	 * @param {function(Animatable_Function_Render_Component): void} animation_function - take in the object and changes it - do not use last_time instead use now
	 * @param {boolean} play_on_creation 
	 */
	constructor(shape, colour, animation_function, start, end, play_on_creation = false) {
		super(shape, colour)
		this.animation_function = animation_function
		this.start = start
		this.end = end
		if (play_on_creation) {
			this.play()
		} else {
			this.stop()
		}
	}
	play() {
		this.last_time = Date.now()
		this.is_playing = true
		this.now = this.start
	}
	stop() {
		this.is_playing = false
	}
	before_draw() {
		if (this.is_playing === false) { return }
		if (this.now > this.end) { stop(); return }
		let now = Date.now()
		let delta_time = now - this.last_time
		this.now += delta_time
		this.last_time = now

		var _ = this
		this.animation_function(_)
	}
}

export { Animatable_Function_Render_Component }