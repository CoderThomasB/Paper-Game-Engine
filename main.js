
globalThis.location2D = class location2D {
	/**
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(x = Number.NaN, y = Number.NaN) {
		this.x = x
		this.y = y
	}

	/**
	 * @param {location2D} other
	 * @returns {location2D}
	 */
	is_equal(other) {
		return other.x == this.x && other.y == this.y
	}
	/**
	 * @param {location2D} other
	 * @returns {location2D}
	 */
	add(other) {
		return new location2D(this.x + other.x, this.y + other.y)
	}
	/**
	 * @param {location2D} other
	 * @returns {location2D}
	 */
	subtract(other) {
		return new location2D(this.x - other.x, this.y - other.y)
	}
	/**
	 * @param {location2D} other
	 * @returns {location2D}
	 */
	min(other) {
		return new location2D(Math.min(this.x, other.x), Math.min(this.y, other.y))
	}
	/**
	 * @param {location2D} other
	 * @returns {location2D}
	 */
	max(other) {
		return new location2D(Math.max(this.x, other.x), Math.max(this.y, other.y))
	}
	/**
	 * @param {location2D} other
	 * @returns {location2D}
	 */
	mack_copy() {
		return new location2D(this.x, this.y)
	}
	/**
	 * @param {location2D} other
	 * @returns {location2D}
	 */
	toString() {
		return `{"x": ${this.x},"y": ${this.y}}`
	}
}



globalThis.world = class world {

	/**
	 * timed_update is meant for being called at an interval to stop infinite updates.
	 */
	timed_update() {
		var me = this
		me.grid.forEach(function (c_block) {
			try {
				c_block.timed_update(me.update_number)
			} catch (error) {

			}
		})
		me.update_number++
	}

	/**
	 * the update function is meant to update all the aspects fo all the objects can be called if something changes.
	 * runs all the update functions in all the grid objects and adds one to the update_number.
	 */
	update() {
		var me = this
		me.grid.forEach(function (c_block) {
			try {
				c_block.update(me.update_number)
			} catch (error) { }
		})
		me.update_number++
	}
	/**
	 * can be called when the all the things are setup is smiler to the update function but is only meant to be used once.
	 */
	start() {

		this.grid.forEach(function (c_block) {
			c_block.start()

		})

	}
	/**
	 * @param {Object} object
	 * @returns {Number}
	 * returns the number that an object has in the grid.
	 */
	get_in_grid(object) {
		var a;
		for (var x = 0; x < this.grid.length; x++) {
			if (object == this.grid[x]) {
				a = x
			}

		}
		return a
	}
	/**
	 * @param {location2D} location
	 * @param {Object} self_
	 * @returns {Array}
	 * gets all the object's at a location.
	 */
	get_at_location(location, self_ = null) {

		var b = []
		this.grid.forEach(function (c_block) {

			if (c_block.location.is_equal(location)) {
				if (self_ != c_block) {
					b.push(c_block)
				}

			}

		})
		return b
	}
	/**
	 * 
	 */
	constructor() {
		this.grid = []			// a list with all the objects in it.
		this.update_number = 0	// the number of updates that have happened.
		this.size = undefined	// if this is a location2D then that is the size limit of the world from 0 to 'x' and 0 to 'y'.
	}

}
globalThis.base = class base {
	/**
	 * this function get called when the world's start function is called.
	 */
	start() { }
	/**
	 * @param {Number} update_number the update_number is the number of updates since world creation.
	 * this function get called when the world's update function is called.
	 */
	update(update_number) { }
	/**
	 * @param {Number} amount the amount of damage.
	 * this is not used in the main file but it is hire for compatibility.
	 */
	damage(amount) { }
	/**
	 * this is used for deleting and removing references to the object.
	 */
	destroy() {
		this.this_world.grid.splice(this.this_world.get_in_grid(this), 1)
		this.this_world = undefined
	}

	/**
	 * @param {world} New_world the world this the object is in.
	 * @param {location2D} New_location the location of the object.
	 */
	constructor(New_world, New_location) {
		this.this_world = New_world
		this.this_world.grid.push(this)
		this.location = New_location
	}
}

globalThis.visible = class visible extends base {
	/**
	 * this function is called just before the object is drawn
	 */
	before_draw() {

	}
	/**
	 * @param {world} New_world the world this the object is in.
	 * @param {location2D} New_location the location of the object.
	 */
	constructor(New_world, New_location) {
		super(New_world, New_location)

		this.visible =
			[new render_component(
				new rectangle(new location2D(1, 1)),
				"hsl(0, 0%, 80%)"
			)
			]
	}
}

globalThis.physics = class physics extends visible {
	/**
	 * moves the object in a direction but not in to solid object (triggers an update)
	 * @param {Number} direction the location of the object.
	 */
	move(direction) {
		this.location = this.location.add(get_direction_as_location2D(direction))
		if (!check(this.location, this.this_world, this)) {
			//console.log("INVALID MOVE")
			this.move(get_opposite_direction(direction))
			return false
		}
		this.this_world.update()
		return true
	}
	/**
	 * @param {world} New_world the world this the object is in.
	 * @param {location2D} New_location the location of the object.
	 */
	constructor(New_world, New_location) {
		super(New_world, New_location)
		this.physics = {
			solid: true
		}
	}

}

/**
 * component system is not complete yet
 */
globalThis.base_component = class base_component {

}

globalThis.sound_component = class sound_component {
	/**
	 * @param {String} sound_src the src of the sound
	 * @param {Boolean} loop determines if the sound will loop
	 */
	constructor(sound_src, loop = false) {
		this.HTML_sound = document.createElement("audio");
		this.HTML_sound.src = sound_src;
		this.HTML_sound.loop = loop;
		this.HTML_sound.setAttribute("preload", "auto");
		this.HTML_sound.setAttribute("controls", "none");
		this.HTML_sound.style.display = "none";
		document.head.appendChild(this.HTML_sound);
	}
}


globalThis.render_component = class render_component extends base_component {
	/**
	 * @param {Object} shape the shape of the component
	 * @param {String} colour the colour of the component
	 */
	constructor(shape, colour) {
		super()
		this.shape = shape
		this.offset = new location2D(0, 0)
		this.use_colour_or_img = colour_or_img.colour
		this.colour = colour
		this.img = undefined
	}
}

globalThis.rectangle = class rectangle {
	/**
	 * @param {location2D} size the size of the rectangle in width and height
	 */
	constructor(size) {
		if (size == undefined) {
			size = new location2D(1, 1)
		} else {
			this.size = size
		}
	}
}

globalThis.text_shape = class text_shape {
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
}

globalThis.polygon = class polygon {
	/**
	 * @param {Array<location2D>} points
	 * @param {boolean} fill
	 */
	constructor(points, fill = false) {
		this.points = points
		this.fill = fill
	}
}

globalThis.line = class line {
	/**
	 * @param {location2D} vector
	 */
	constructor(vector) {
		this.vector = vector
	}
}

globalThis.colour_or_img = {
	colour: true,
	img: false
}

/**
 * @param {number} direction
 * @returns {number}
 */
globalThis.get_opposite_direction = (direction) => {
	switch (direction) {
		case directions.up:
			return directions.down
			break
		case directions.down:
			return directions.up
			break
		case directions.left:
			return directions.right
			break
		case directions.right:
			return directions.left
			break
		default:
			throw new DirectionTypeError()
			break
	}
}

/**
 * @param {number} direction
 * @returns {location2D}
 */
globalThis.get_direction_as_location2D = (direction) => {
	switch (direction) {
		case directions.up:
			return new location2D(0, -1)
		case directions.down:
			return new location2D(0, 1)
		case directions.left:
			return new location2D(-1, 0)
		case directions.right:
			return new location2D(1, 0)
		default:
			throw new DirectionTypeError()
	}
}

globalThis.DirectionTypeError = class DirectionTypeError extends TypeError {
	constructor() {
		super()
		this.message = "Input is not a direction!"
	}
}


globalThis.camera = class camera extends base {

	timed_update(x) {
		if (this.draw_on_timed_update) {
			this.draw()
		}
	}
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


		var draw_element = function (A_render_component, thing) {

			var x = thing.location.x
			var y = thing.location.y
			try {
				thing.before_draw()
			} catch (error) {
				console.error(error)
			}
			switch (A_render_component.shape.constructor) {
				case rectangle:
					switch (A_render_component.use_colour_or_img) {
						case colour_or_img.img:
							ctx_context.drawImage(
								A_render_component.img,
								Math.round((x + A_render_component.offset.x - me.location.x) * b_size_x),
								Math.round((y + A_render_component.offset.y - me.location.y) * b_size_y),
								Math.round(b_size_x * A_render_component.shape.size.x),
								Math.round(b_size_y * A_render_component.shape.size.y))// display img
							break;
						case colour_or_img.colour:
							ctx_context.fillStyle = A_render_component.colour //select color
							ctx_context.fillRect(
								Math.round((x + A_render_component.offset.x - me.location.x) * b_size_x),
								Math.round((y + A_render_component.offset.y - me.location.y) * b_size_y),
								/*x * b_size_x - (me.location.x * b_size_x),
								y * b_size_y - (me.location.y * b_size_y),*/
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
					if (A_render_component.shape.size == "height") {
						ctx_context.font = `${(b_size_y * A_render_component.shape.height * 1.4) - 1}px monospace`
					}
					if (A_render_component.shape.size == "width") {
						ctx_context.font = `${b_size_x * ((A_render_component.shape.width / A_render_component.shape.text.length) * 1.70)}px monospace`
					}
					ctx_context.textAlign = A_render_component.shape.textAlign
					ctx_context.fillText(
						A_render_component.shape.text,
						Math.round((x + A_render_component.offset.x - me.location.x) * b_size_x),
						Math.round(
							(y + A_render_component.offset.y - me.location.y) * b_size_y),
					)
					break
				case line:
					ctx_context.fillStyle = A_render_component.colour //select color
					ctx_context.beginPath()
					ctx_context.moveTo(
						Math.round((x + A_render_component.offset.x - me.location.x) * b_size_x),
						Math.round((y + A_render_component.offset.y - me.location.y) * b_size_y)
					)
					ctx_context.lineTo(
						Math.round((x + A_render_component.offset.x - me.location.x + A_render_component.shape.vector.x) * b_size_x),
						Math.round((y + A_render_component.offset.y - me.location.y + A_render_component.shape.vector.y) * b_size_y)
					)
					ctx_context.closePath();
					ctx_context.stroke();
					break;
				case polygon:
					ctx_context.fillStyle = A_render_component.colour //select color
					ctx_context.beginPath()
					ctx_context.moveTo(
						Math.round((x + A_render_component.offset.x - me.location.x) * b_size_x),
						Math.round((y + A_render_component.offset.y - me.location.y) * b_size_y)
					)
					for (let i = 0; i < A_render_component.shape.points.length; i++) {
						ctx_context.lineTo(
							Math.round((x + A_render_component.offset.x - me.location.x + A_render_component.shape.points[i].x) * b_size_x),
							Math.round((y + A_render_component.offset.y - me.location.y + A_render_component.shape.points[i].y) * b_size_y)
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

		this.this_world.grid.forEach(function (c_block) {
			if (c_block.visible != undefined) {
				//console.log(c_block.visible)
				c_block.visible.forEach((A_render_component) => {
					draw_element(A_render_component, c_block)
				})
			}
		})
	}
	/**
	 * @param {world} New_world the world this the object is in.
	 * @param {location2D} New_location the location of the object.
	 * @param {HTMLCanvasElement} ctx the Canvas used for drawing.
	 * @param {location2D} screen_size the size of the 'screen' or render area.
	 * @param {Boolean} draw_on_timed_update an option for auto drawing on timed_update.
	 */
	constructor(New_world, New_location, ctx, screen_size, draw_on_timed_update = false) {
		super(New_world, New_location)

		this.ctx = ctx
		this.screen_size = screen_size
		this.draw_on_timed_update = draw_on_timed_update
	}
}

/**
 * @param {location2D} location the location to check.
 * @param {world} The_world the world to check in.
 * @param {Object} self_ the function will not included this in the output
 * @returns {Boolean}
 * true is valid and false is invalid
 */
globalThis.check = (location, The_world, self_) => {
	is = true
	is = check_out_of_world(location, The_world) && is
	is = check_is_in_solid(location, The_world, self_) && is
	return is
}

/**
 * @param {location2D} location the location to check.
 * @param {world} The_world the world to check in.
 * @returns {Boolean}
 * true is valid and false is invalid
 * only checks if the location is out of the world 'size'
 */
globalThis.check_out_of_world = (location, The_world) => {
	if (The_world.size == undefined) {
		return true
	}
	is_out_of_world =
		((location.x < The_world.size.x
			&&
			location.y < The_world.size.y
		) &&
			(location.x >= 0 && location.y >= 0))
	return is_out_of_world
}

/**
 * @param {location2D} location the location to check.
 * @param {world} The_world the world to check in.
 * @param {Object} self_ the function will not included this in the output
 * @returns {Boolean}
 * true is valid and false is invalid
 * only checks if the location is occupied by a solid object
 */
globalThis.check_is_in_solid = (location, The_world, self_) => {
	is_in_solid = false
	The_world.get_at_location(location, self_).forEach(function (Thing) {
		if (Thing.physics != undefined) {
			is_in_solid = Thing.physics.solid || is_in_solid
		}
	})
	return !is_in_solid
}

/**
 * @enum {Number}
 */
globalThis.directions = {
	up: 1,
	right: 2,
	down: 3,
	left: 4,
}

/**
 * Not Finished - Do Not Use
 */
globalThis.rotation2D = class rotation2D {
	constructor(z = Number.NaN) {
		this.z = z
	}

	//var x = (Number.NaN)
	//var y = (Number.NaN)
	is_equal(other) {
		return other.z == this.z
	}
	add(other) {
		return new location2D(this.z + other.z)
	}
	mack_copy() {
		return new location2D(this.z)
	}
	in_degrees() {
		return this.z
	}
	in_radians() {
		return (this.z / 180) * Maths.PI
	}
}

// Checks if running in node or web browser
try {
	exports.test = "test"
	console.log("NodeJS")
} catch (error) {
	console.log("Web Browser")
}
