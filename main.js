
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
	mack_copy() {
		return new location2D(this.x, this.y)

	}
}


class world {
	grid = [] // a list with all the objects in it
	update_number = 0 // the number of updates that have happened
	size = undefined // if this is a location2D then that is the size limit of the world from 0 to 'x' and 0 to 'y'

	update() {
		var me = this
		me.grid.forEach(function (c_block) {
			c_block.update(me.updateNO)

		})
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
		//console.log("get_at_location")]
		//console.log(self_)
		var b = []
		this.grid.forEach(function (c_block) {
			//console.log(c_block)
			//console.log(c_block.location.is_equal(location))
			if (c_block.location.is_equal(location)) {
				if (self_ != c_block) {
					b.push(c_block)
				}

			}

		})
		return b
	}
	
	
}
class base {
	start() { }
	update(x) { }
	damage() { }
	destroy() {
		this.this_world.grid.splice(this.this_world.get_in_grid(this),1)
		this.this_world = undefined
	}


	scail = new location2D(1, 1)
	this_world = null
	location = null
	
	constructor(New_world, New_location) {
		var me = this
		try {

			// this is the old code
			/*if (w.constructor == world) {
				Object.keys(w.setings.default[me.constructor.name]).forEach(function (key) {
					if (typeof (w.setings.default[me.constructor.name][key]) == typeof ("")) {
						var m = "me." + key + " = '" + w.setings.default[me.constructor.name][key] + "'"
					} else {
						var m = "me." + key + " = " + w.setings.default[me.constructor.name][key]
					}
					console.log(m)
					eval(m)
				})
			}*/



			this.this_world = New_world
			this.this_world.grid.push(this)

			this.location = New_location


		} catch (e) {
			console.log(e)

		}
	}
}
class visible extends base {
	visible = {
		colour_or_img: true,
		colour: "hsl(0, 0%, 80%)"
	}
}
class physics extends visible {
	physics = {
		solid: true
	}
	move (direction){
		this.location = this.location.add(get_direction_as_location2D(direction))
		if(!check(this.location, this.this_world, this)){
			console.log("INVALID MOVE")
			this.move(get_opposite_direction(direction))
		}
		this.this_world.update()
	}
	
}

function get_opposite_direction(direction){
	switch(direction){
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
function get_direction_as_location2D(direction){
	switch(direction){
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
class DirectionTypeError extends TypeError{
	message = "Input is not a direction!"
}


class camera extends base {
	ctx = undefined
	update(x) { }
	draw() {

		var ctx = this.ctx //define stuff
		var ctx_reder = ctx.getContext("2d")
		var xs = ctx.width
		var ys = ctx.height
		var by = ys / ctx.size.y
		var bx = xs / ctx.size.x

		ctx_reder.clearRect(0, 0, xs, ys)

		var draw_elmint = function (c_block) {

			var x = c_block.location.x
			var y = c_block.location.y
			if (c_block.visible.colour_or_img) {

				ctx_reder.fillStyle = c_block.visible.colour //select color
				ctx_reder.fillRect(x * bx, y * by, bx * c_block.scail.x, by * c_block.scail.y) //fill color
			} else {
				ctx_reder.drawImage(c_block.visible.img, x * bx, y * by, bx * c_block.scail.x, by * c_block.scail.y)// display img
			}
		}

		this.this_world.grid.forEach(function (c_block) {
			if (c_block.visible != undefined) {
				draw_elmint(c_block)
			}
		})
	}
	
	constructor(New_world, New_location, ctx, screen_size) {
		super(New_world, New_location)
		this.ctx = ctx
		this.ctx.size = screen_size
	}
}



// true is valid and false is invalid
// self_ is the objets self used to not detet it self
function check(location, The_world, self_){
	is = true
	is = check_out_of_world(location, The_world) && is
	is = check_is_in_solid(location, The_world, self_) && is
	return is
}
function check_out_of_world(location, The_world){
	if(The_world.size == undefined){
		return true
	}
	is_out_of_world = 
		((location.x < The_world.size.x 
		&&
		location.y < The_world.size.y
		) || 
		(location.x < 0 && location.y < 0))
	return is_out_of_world
}
function check_is_in_solid(location, The_world, self_){
	is_in_solid = false
	The_world.get_at_location(location, self_).forEach(function (Thing) {
		if(Thing.physics != undefined){
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
