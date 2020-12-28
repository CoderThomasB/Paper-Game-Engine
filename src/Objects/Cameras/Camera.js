import { Abstract_Camera } from "./Abstract_Camera"
import { Rectangle } from "../../Shapes/Rectangle"
import { Colour_Or_Img } from "../../Enums"

class Camera extends Abstract_Camera {
	/**
	 * draws the world to the ctx
	 */
	draw() {

		var me = this

		var ctx = this.ctx //define stuff
		var ctx_context = ctx.getContext("2d")
		var xs = ctx.width
		var ys = ctx.height
		var b_size_y = ys / this.screen_size.y
		var b_size_x = xs / this.screen_size.x

		ctx_context.clearRect(0, 0, xs, ys)


		var draw_element = (A_render_component, thing) => {

			var x = thing.get_true_location().x
			var y = thing.get_true_location().y

			var my_x = me.get_true_location().x
			var my_y = me.get_true_location().y

			var offset_x = A_render_component.offset.x
			var offset_y = A_render_component.offset.y

			try {
				thing.before_draw()
			} catch (error) {
				console.error(error)
			}
			try {
				A_render_component.before_draw()
			} catch (error) {
				console.error(error)
			}
			switch (A_render_component.shape.constructor) {
				case Rectangle:
					switch (A_render_component.use_colour_or_img) {
						case Colour_Or_Img.img:
							ctx_context.drawImage(
								A_render_component.img,
								Math.round((x + offset_x - my_x) * b_size_x),
								Math.round((y + offset_y - my_y) * b_size_y),
								Math.round(b_size_x * A_render_component.shape.size.x),
								Math.round(b_size_y * A_render_component.shape.size.y))// display img
							break;
						case Colour_Or_Img.colour:
							ctx_context.fillStyle = A_render_component.colour //select color
							ctx_context.fillRect(
								Math.round((x + offset_x - my_x) * b_size_x),
								Math.round((y + offset_y - my_y) * b_size_y),
								/*x * b_size_x - (my_x * b_size_x),
								y * b_size_y - (my_y * b_size_y),*/
								Math.round(b_size_x * A_render_component.shape.size.x),
								Math.round(b_size_y * A_render_component.shape.size.y)) //fill color
							break;
						default:
							console.log(`Invalid use_colour_or_img on`)
							console.log(A_render_component)
							break;
					}
					break;
				case text_shape:
					ctx_context.fillStyle = A_render_component.colour //select color
					if (A_render_component.shape.size === "height") {
						ctx_context.font = `${(b_size_y * A_render_component.shape.height * 1.4) - 1}px monospace`
					}
					if (A_render_component.shape.size === "width") {
						ctx_context.font = `${b_size_x * ((A_render_component.shape.width / A_render_component.shape.text.length) * 1.70)}px monospace`
					}
					ctx_context.textAlign = A_render_component.shape.textAlign
					ctx_context.fillText(
						A_render_component.shape.text,
						Math.round((x + offset_x - my_x) * b_size_x),
						Math.round(
							(y + offset_y - my_y) * b_size_y),
					)
					break
				case line:
					ctx_context.fillStyle = A_render_component.colour //select color
					ctx_context.beginPath()
					ctx_context.moveTo(
						Math.round((x + offset_x - my_x) * b_size_x),
						Math.round((y + offset_y - my_y) * b_size_y)
					)
					ctx_context.lineTo(
						Math.round((x + offset_x - my_x + A_render_component.shape.vector.x) * b_size_x),
						Math.round((y + offset_y - my_y + A_render_component.shape.vector.y) * b_size_y)
					)
					ctx_context.closePath();
					ctx_context.stroke();
					break;
				case polygon:
					ctx_context.fillStyle = A_render_component.colour //select color
					ctx_context.beginPath()
					ctx_context.moveTo(
						Math.round((x + offset_x - my_x) * b_size_x),
						Math.round((y + offset_y - my_y) * b_size_y)
					)
					for (let i = 0; i < A_render_component.shape.points.length; i++) {
						ctx_context.lineTo(
							Math.round((x + offset_x - my_x + A_render_component.shape.points[i].x) * b_size_x),
							Math.round((y + offset_y - my_y + A_render_component.shape.points[i].y) * b_size_y)
						)
					}
					if (A_render_component.shape.fill) {
						ctx_context.fill();
					} else {
						ctx_context.closePath();
						ctx_context.stroke();
					}
					break
				default:
					console.log(`Invalid shape on`)
					console.log(A_render_component)
					break;
			}

		}

		this.Containing_World.All_objects.forEach((element) => {
			if (element.visible !== undefined) {
				element.visible.forEach((A_render_component) => {
					draw_element(A_render_component, element)
				})
			}
		})
	}
	/**
	 * @param {world} The_Container the Container this the object is in.
	 * @param {Vector2} New_location the location of the object.
	 * @param {HTMLCanvasElement} ctx the Canvas used for drawing.
	 * @param {Vector2} screen_size the size of the 'screen' or render area.
	 * @param {Boolean} draw_on_timed_update an option for auto drawing on timed_update.
	 */
	constructor(The_Container, New_location, ctx, screen_size, draw_on_timed_update = false) {
		super(The_Container, New_location, ctx, draw_on_timed_update)

		this.screen_size = screen_size
	}
}

export { Camera }