const { Dir } = require("fs")

globalThis.main = require("../main.js")
globalThis.express = require("express")

globalThis.ActionLink_component = class ActionLink_component {
	constructor(app, _URL, Action) {
		
		this.app = app
		this._URL = _URL
		this.Action = Action
		this.Access_Control_Allow_Origin = "*"

		var me = this

		app.post(_URL, (req, res) => {
			try{
			res.json(me.Action(req.query, me))
			}catch(e){
				if(e.constructor = DirectionTypeError){
					console.log("input is not a direction")
				}
			}
		})
	}

}

globalThis.DataLink_component = class DataLink_component {
	constructor(app, base_URL, data_to_send) {

		this.data_to_send = data_to_send
		this.app = app
		this.base_URL = base_URL

		var me = this

		app.get(base_URL, (req, res) => {
			console.log(me)
			res.json(me.data_to_send())
		})
	}

}


// is is so different to a camera that we do not use extends
globalThis.cameraLink = class cameraLink extends base {
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


			this.this_world.grid.forEach(function (c_block) {
				if (c_block.visible != undefined) {
					c_block.visible.forEach((A_render_component) => {
						var draw_data_Now =
						{
							use_colour_or_img: A_render_component.use_colour_or_img,
							img: A_render_component.img,
							colour: A_render_component.colour,
							shape_type: A_render_component.shape.constructor.name,
							location: [
								(c_block.location.x + A_render_component.offset.x - me.location.x),
								(c_block.location.y + A_render_component.offset.y - me.location.y),
							]
						}
						switch (A_render_component.shape.constructor) {
							case rectangle:
								draw_data_Now.shape_data = {
									size: [
										A_render_component.shape.size.x,
										A_render_component.shape.size.y,
									]
								}
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

/*
{
	:"img" or ""
}


*/