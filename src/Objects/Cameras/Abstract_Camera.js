import { Base } from "../Base"

class Abstract_Camera extends Base {
	timed_update(x) {
		if (this.draw_on_timed_update) {
			this.draw()
		}
	}
	/**
	 * @param {world} The_Container the Container this the object is in.
	 * @param {Vector2} New_location the location of the object.
	 * @param {HTMLCanvasElement} ctx the Canvas used for drawing.
	 * @param {Vector2} screen_size the size of the 'screen' or render area.
	 * @param {Boolean} draw_on_timed_update an option for auto drawing on timed_update.
	 */
	constructor(The_Container, New_location, ctx, draw_on_timed_update = false) {
		super(The_Container, New_location)

		this.ctx = ctx
		this.draw_on_timed_update = draw_on_timed_update
	}
}

export { Abstract_Camera }