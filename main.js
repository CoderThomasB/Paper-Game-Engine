
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
	grid = []
	update_number = 0

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

	scail = new location2D(1, 1)
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

				ctx_reder.fillStyle = c_block.colour //select color
				ctx_reder.fillRect(x * bx, y * by, bx * c_block.scail.x, by * c_block.scail.y) //fill color
			} else {
				ctx_reder.drawImage(c_block.img, x * bx, y * by, bx * c_block.scail.x, by * c_block.scail.y)// display img

			}
		}

		this.this_world.grid.forEach(function (c_block) {
			if (c_block.visible != undefined) {
				draw_elmint(c_block)
			}
		})
	}
	
	constructor(New_world, New_location, ctx) {
		super(New_world, New_location)
		this.ctx = ctx

	}
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