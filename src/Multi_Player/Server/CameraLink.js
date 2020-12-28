import { Base } from "../../Objects/Base"
import { Rectangle, Text_Shape, Line, Polygon } from "../../Shapes/Shapes"

class CameraLink extends Base {
	constructor(New_world, New_location, screen_size, app, base_URL) {
		super(New_world, New_location)

		this.screen_size = screen_size

		/* */
		app.get(base_URL, (req, res) => {
			res.json({
				api_Commands: [
					{ type: "GET", name: "draw_data" }
				]
			})
		})
		app.get(base_URL + "draw_data/", (req, res) => {
			let draw_data = []
			let me = this


			this.Containing_World.All_objects.forEach(function (c_block) {

				var x = c_block.get_true_location().x
				var y = c_block.get_true_location().y

				var my_x = me.get_true_location().x
				var my_y = me.get_true_location().y

				if (c_block.visible != undefined) {
					c_block.visible.forEach((A_render_component) => {

						var offset_x = A_render_component.offset.x
						var offset_y = A_render_component.offset.y

						var draw_data_Now =
						{
							use_colour_or_img: A_render_component.use_colour_or_img,
							img: A_render_component.img,
							colour: A_render_component.colour,
							shape_type: A_render_component.shape.constructor.name,
							location: [
								(x + offset_x - my_x),
								(y + offset_y - my_y),
							]
						}
						switch (A_render_component.shape.constructor) {
							case Rectangle:
								draw_data_Now.shape_data = {
									size: [
										A_render_component.shape.size.x,
										A_render_component.shape.size.y,
									]
								}
								break
							case Text_Shape:
								draw_data_Now.shape_data = {}
								draw_data_Now.shape_data.size = A_render_component.shape.size
								draw_data_Now.shape_data.height = A_render_component.shape.height
								draw_data_Now.shape_data.width = A_render_component.shape.width
								draw_data_Now.shape_data.textAlign = A_render_component.shape.textAlign
								draw_data_Now.shape_data.text = A_render_component.shape.text

								break
							case Line:
								draw_data_Now.shape_data.vector = [
									(x + offset_x - my_x + A_render_component.shape.vector.x),
									(y + offset_y - my_y + A_render_component.shape.vector.y)]
								break
							case Polygon:
								draw_data_Now.shape_data = {}
								draw_data_Now.shape_data.points = []
								for (let i = 0; i < A_render_component.shape.points.length; i++) {
									draw_data_Now.shape_data.points[i] = [
										(x + offset_x - my_x + A_render_component.shape.points[i].x),
										(y + offset_y - my_y + A_render_component.shape.points[i].y)
									]
								}
								draw_data_Now.shape_data.fill = A_render_component.shape.fill
								break
						}
						draw_data.push(draw_data_Now)
					})
				}
			})

			res.json({
				"draw_data": draw_data,
				"screen_size": [this.screen_size.x, this.screen_size.y]
			}
			)
		})

	}
}

export { CameraLink }