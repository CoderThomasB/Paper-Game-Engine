
class location2D {
	constructor(x = Number.NaN, y = Number.NaN) {
		this.x = x
		this.y = y
	}

	is_equal(other) {
		return other.x == this.x && other.y == this.y
	}
	add(other) {
		return new location2D(this.x + other.x, this.y + other.y)
	}
	subtract(other) {
		return new location2D(this.x - other.x, this.y - other.y)
	}
	min(other) {
		return new location2D(Math.min(this.x, other.x), Math.min(this.y, other.y))
	}
	max(other) {
		return new location2D(Math.max(this.x, other.x), Math.max(this.y, other.y))
	}
	mack_copy() {
		return new location2D(this.x, this.y)
	}
	toString() {
		return `{"x": ${this.x},"y": ${this.y}}`
	}
}


class world {
	// Safari dose not do this
	//grid = [] // a list with all the objects in it
	//update_number = 0 // the number of updates that have happened
	//size = undefined // if this is a location2D then that is the size limit of the world from 0 to 'x' and 0 to 'y'

	timed_update() {
		var me = this
		//console.time(this.update_number.toString())
		me.grid.forEach(function (c_block) {
			try {
				c_block.timed_update(me.update_number)
			} catch (error) {

			}
		})
		//console.timeEnd(this.update_number.toString())
		me.update_number++
	}

	update() {
		var me = this
		//console.time(this.update_number.toString())
		me.grid.forEach(function (c_block) {
			c_block.update(me.update_number)
		})
		//console.timeEnd(this.update_number.toString())
		me.update_number++
	}
	start() {

		this.grid.forEach(function (c_block) {
			c_block.start()

		})

	}
	get_in_grid(self_) {
		var a;
		for (var x = 0; x < this.grid.length; x++) {
			if (self_ == this.grid[x]) {
				a = x
			}

		}
		return a
	}
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
	constructor() {
		this.grid = [] // a list with all the objects in it
		this.update_number = 0 // the number of updates that have happened
		this.size = undefined // if this is a location2D then that is the size limit of the world from 0 to 'x' and 0 to 'y'


	}

}
class base {
	start() { }
	update(x) { }
	damage(amount) { }
	destroy() {
		this.this_world.grid.splice(this.this_world.get_in_grid(this), 1)
		this.this_world = undefined
	}

	// Safari dose not do this
	//this_world = null
	//location = null

	constructor(New_world, New_location) {
		var me = this
		try {

			this.this_world = undefined
			this.location = undefined

			this.this_world = New_world
			this.this_world.grid.push(this)

			this.location = New_location

		} catch (e) {
			console.log(e)

		}
	}
}

class visible extends base {
	/*visible = {
		colour_or_img: true,
		scail: new location2D(1, 1),
		colour: "hsl(0, 0%, 80%)"
	}*/

	before_draw() {

	}

	constructor(New_world, New_location) {
		super(New_world, New_location)
		/*this.visible = {
			colour_or_img: true,
			scail: new location2D(1, 1),
			colour: "hsl(0, 0%, 80%)"
		}*/

		// The New reding systeam
		// NOT WORKING YET!
		/*this.visible = 
			[new render_component(
				new rectangle(new location2D(1,1)),
				"hsl(0, 0%, 80%)")]*/
	}
}

class physics extends visible {
	/*physics = {
		solid: true
	}*/
	move(direction) {
		this.location = this.location.add(get_direction_as_location2D(direction))
		if (!check(this.location, this.this_world, this)) {
			//console.log("INVALID MOVE")
			this.move(get_opposite_direction(direction))
			this.this_world.update()
			return false
		}
		return true
		this.this_world.update()
	}
	constructor(New_world, New_location) {
		super(New_world, New_location)
		this.physics = {
			solid: true
		}
	}

}

class base_component {

}

class sound_component {
	constructor(sound_src, loop=false) {
		this.HTML_sound = document.createElement("audio");
		this.HTML_sound.src = sound_src;
		this.HTML_sound.loop = loop;
		this.HTML_sound.setAttribute("preload", "auto");
		this.HTML_sound.setAttribute("controls", "none");
		this.HTML_sound.style.display = "none";
		document.head.appendChild(this.HTML_sound);
	}
}

// Not in use yet!
/*class render_component extends base_component {
	constructor(shape, colour) {
		this.shape = shape
		this.use_colour_or_img = colour_or_img.colour
		this.colour = colour
		this.img = undefined
	}
}

class rectangle {
	constructor (size){
		this.size = size
	}
}

const colour_or_img = {
	colour: true,
	img: false
}
*/
function get_opposite_direction(direction) {
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
function get_direction_as_location2D(direction) {
	switch (direction) {
		case directions.up:
			return new location2D(0, -1)
			break
		case directions.down:
			return new location2D(0, 1)
			break
		case directions.left:
			return new location2D(-1, 0)
			break
		case directions.right:
			return new location2D(1, 0)
			break
		default:
			throw new DirectionTypeError()
			break
	}
}
class DirectionTypeError extends TypeError {
	constructor() {
		super()
		message = "Input is not a direction!"
	}
}


class camera extends base {

	update(x) {
		if (this.draw_on_update) {
			this.draw()
		}
	}
	draw() {

		var me = this

		var ctx = this.ctx //define stuff
		var ctx_reder = ctx.getContext("2d")
		var xs = ctx.width
		var ys = ctx.height
		var b_size_y = ys / this.screen_size.y
		var b_size_x = xs / this.screen_size.x

		ctx_reder.clearRect(0, 0, xs, ys)

		var draw_elmint = function (c_block) {

			var x = c_block.location.x
			var y = c_block.location.y
			try {
				c_block.before_draw()
			} catch (error) {
				console.error(error)
			}
			if (c_block.visible.colour_or_img) {

				ctx_reder.fillStyle = c_block.visible.colour //select color
				ctx_reder.fillRect(x * b_size_x - (me.location.x * b_size_x), y * b_size_y - (me.location.y * b_size_y), b_size_x * c_block.visible.scail.x, b_size_y * c_block.visible.scail.y) //fill color
			} else {
				//console.log(c_block.visible)
				ctx_reder.drawImage(c_block.visible.img, x * b_size_x - (me.location.x * b_size_x), y * b_size_y - (me.location.y * b_size_y), b_size_x * c_block.visible.scail.x, b_size_y * c_block.visible.scail.y)// display img
			}
		}

		this.this_world.grid.forEach(function (c_block) {
			if (c_block.visible != undefined) {
				draw_elmint(c_block)
			}
		})
	}

	constructor(New_world, New_location, ctx, screen_size, draw_on_update = false) {
		super(New_world, New_location)

		this.ctx = ctx
		this.screen_size = screen_size
		this.draw_on_update = draw_on_update
	}
}



// true is valid and false is invalid
// self_ is the objets self used to not detet it self
function check(location, The_world, self_) {
	is = true
	is = check_out_of_world(location, The_world) && is
	is = check_is_in_solid(location, The_world, self_) && is
	return is
}
function check_out_of_world(location, The_world) {
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
function check_is_in_solid(location, The_world, self_) {
	is_in_solid = false
	The_world.get_at_location(location, self_).forEach(function (Thing) {
		if (Thing.physics != undefined) {
			is_in_solid = Thing.physics.solid || is_in_solid
		}
	})
	return !is_in_solid
}


const directions = {
	up: 1,
	right: 2,
	down: 3,
	left: 4
}


class rotashon2D {
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
	in_degrs() {
		return this.z
	}
	in_radins() {
		return (this.z / 180) * Maths.PI
	}
}
