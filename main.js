/*
The Paper Game Engine by Thomas Booker is licensed under CC BY 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0
see the LICENSE file
*/


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
		return other.x === this.x && other.y === this.y
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
			if (object === this.grid[x]) {
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

/* animation example var 'a = new animation([
	new keyframe(0, "a", 2, keyframe_types.liner),
	new keyframe(10, "a", 3, keyframe_types.liner),
	new keyframe(20, "a", -1, keyframe_types.liner)
	], 0, 20)'
*/
/*
	var _ = new animation([
		new keyframe(0, "x", 0, keyframe_types.liner),
		new keyframe(175, "x", 9, keyframe_types.liner),
		new keyframe(200, "x", 0, keyframe_types.liner)
		], 0, 200)
*/

globalThis.animation = class animation {
	/**
	 * 
	 * @param {Array<keyframe>} keyframes 
	 * @param {Number} start
	 * @param {Number} end
	 */
	constructor(keyframes, start, end) {
		this.keyframes = keyframes
		this.now = start
		this.start = start
		this.end = end
	}
	/**
	 * goes to the start of the animation
	 */
	goto_start() {
		this.now = this.start
		return this.now
	}
	/**
	 * goes to the end of the animation
	 */
	goto_end() {
		this.now = this.end
		return this.now
	}
	/**
	 * step 1 time unit forward
	 */
	step() {
		this.now += 1
		return this.now
	}
	/**
	 * gets all the keyframes with an attribute
	 * @param {String} attribute the attribute that the keyframes will match
	 */
	get_keyframes_with_attribute(attribute) {
		let _ = []
		this.keyframes.forEach((keyframe) => {
			if (keyframe.attribute === attribute) {
				_.push(keyframe)
			}
		})
		return _
	}
	/**
	 * logs the values at every integer time white an attribute
	 * @param {String} attribute the attribute of the keyframes to log
	 */
	console_log(attribute) {
		this.goto_start()
		// i use '<=' because liner key frames need to finish
		while (this.now <= this.end) {
			console.log(this.now + " : " + this.get_attribute_value_now(attribute))
			this.step()
		}
	}
	/**
	 * apply the animation to an object. the attributes will be mapped to the objects key and the value writhen accordantly
	 * Mite not work curtly at the time of this commit.
	 * @param {*} object the object to animation
	 */
	apply_animation(object, step_intervale) {
		this.goto_start()
		// i use '<=' because liner key frames need to finish
		var me = this
		var _ = () => {
			if (me.now <= me.end) {
				Object.keys(object).forEach((key) => {
					let value = me.get_attribute_value_now(key)
					if (value === undefined) {
						return
					} else {
						object[key] = value
					}
				})
				me.step()
			} else {
				clearImmediate(Interval)
			}
		}
		var Interval = setInterval(_, step_intervale);
	}
	/**
	 * gets the value of an attribute at the 'now' frame
	 * @param {String} attribute 
	 */
	get_attribute_value_now(attribute) {
		let options = this.get_keyframes_with_attribute(attribute)
		if (options.length === 0) {
			return undefined
		}
		let closet_keyframe_behind = undefined
		let closet_keyframe_ahead = undefined
		options.forEach((keyframe) => {
			if (keyframe.time <= this.now) {
				if (closet_keyframe_behind === undefined) {
					closet_keyframe_behind = keyframe
					return
				}
				if (keyframe.time >= closet_keyframe_behind.time) {
					closet_keyframe_behind = keyframe
					return
				}
			} else {
				if (closet_keyframe_ahead === undefined) {
					closet_keyframe_ahead = keyframe
					return
				}
				if (keyframe.time < closet_keyframe_ahead.time) {
					closet_keyframe_ahead = keyframe
					return
				}
			}
		})
		if (closet_keyframe_behind === undefined) {
			return undefined
		}
		if (closet_keyframe_behind.type === keyframe_types.snap) {
			return closet_keyframe_behind.value
		}
		if (closet_keyframe_behind.type === keyframe_types.liner) {
			if (closet_keyframe_ahead === undefined) {
				return closet_keyframe_behind.value
			}
			let behind_length = this.now - closet_keyframe_behind.time
			let ahead_length = closet_keyframe_ahead.time - this.now
			let ahead_value = closet_keyframe_ahead.value
			let behind_value = closet_keyframe_behind.value
			let distance = behind_length + ahead_length



			return (
				(
					behind_value * ahead_length
				)
				+
				(
					ahead_value * behind_length
				)
			) / distance

		}
	}

}

globalThis.keyframe_types = {
	"snap": 1,
	"liner": 2
}

globalThis.keyframe = class keyframe {
	/**
	 * 
	 * @param {Number} time 
	 * @param {String} attribute 
	 * @param {Any} value 
	 */
	constructor(time, attribute, value, type = keyframe_types.snap) {
		if (type === keyframe_types.liner) {
			if (value.constructor != Number) {
				throw new error("can not be liner if value not a number")
			}
		}
		this.time = time
		this.attribute = attribute
		this.value = value
		this.type = type
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
	before_draw() {

	}
}

globalThis.animatable_function_render_component = class animatable_function_render_component extends render_component {
	/**
	 * 
	 * @param {Object} shape the shape of the component
	 * @param {String} colour the colour of the component
	 * @param {function(animatable_function_render_component): void} animation_function - take in the object and changes it - do not use last_time instead use now
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
	before_draw(){
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

globalThis.animatable_keyframe_render_component = class animatable_keyframe_render_component extends render_component {
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

globalThis.rectangle = class rectangle {
	/**
	 * @param {location2D} size the size of the rectangle in width and height
	 */
	constructor(size) {
		if (size === undefined) {
			size = new location2D(1, 1)
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


		var draw_element = (A_render_component, thing) => {

			var x = thing.location.x
			var y = thing.location.y
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
					if (A_render_component.shape.size === "height") {
						ctx_context.font = `${(b_size_y * A_render_component.shape.height * 1.4) - 1}px monospace`
					}
					if (A_render_component.shape.size === "width") {
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
	if (The_world.size === undefined) {
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

	/**
	 * Not Finished - Do Not Use
	 */
	constructor(z = Number.NaN) {
		this.z = z
	}

	//var x = (Number.NaN)
	//var y = (Number.NaN)
	is_equal(other) {
		return other.z === this.z
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


















console.log("this is on line 999. and it has not hade an error!")