
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
	//grid = []

	/*setings = {
		default: {
			block: {
				solid: true,
				colour_or_img: true,
				colour: "hsl(0, 0%, 80%)",
			},
			master: {
				solid: true,
				colour_or_img: true,
				colour: "hsl(0, 0%, 80%)",
				
				
			}
		}
		
	}*/
	//size = new location2D(4,4)
	draw() {
		//console.log(this)
		var c = this.ctx //document.getElementById("match")
		var ctx = c.getContext("2d")
		var xs = c.width
		var ys = c.height
		var by = ys / this.ctx.size.y
		var bx = xs / this.ctx.size.x


		var temp_f = function (c_block) {
			var x = c_block.location.x
			var y = c_block.location.y
			//console.log(c_block.location)
			if (c_block.colour_or_img) {
				//console.log("colour")	
				ctx.fillStyle = c_block.colour
				ctx.fillRect(x * bx, y * by, bx * c_block.scail.x, by * c_block.scail.y)
			} else {
				//console.log("img")	
				ctx.drawImage(c_block.img, x * bx, y * by, bx * c_block.scail.x, by * c_block.scail.y)

			}
		}

		this.grid.forEach(function (c_block) {
			//console.group(c_block)
			var temp_f = function (c_block) {


				var temp = []
				if (c_block.constructor == temp.constructor) {
					c_block.forEach(function (c_block) {
						temp_f(c_block)
					})
				} else {
					var x = c_block.location.x
					var y = c_block.location.y
					//console.log(c_block.location)
					if (c_block.colour_or_img) {
						//console.log("colour")	
						ctx.fillStyle = c_block.colour
						ctx.fillRect(x * bx, y * by, bx * c_block.scail.x, by * c_block.scail.y)
					} else {
						//console.log("img")	
						ctx.drawImage(c_block.img, x * bx, y * by, bx * c_block.scail.x, by * c_block.scail.y)

					}

				}
			}
			temp_f(c_block)
			//console.groupEnd()
		})
		//console.groupEnd()
	}
	update() {
		var me = this
		me.grid.forEach(function (c_block) {
			c_block.update(me.updateNO)

		})
		me.draw()
		me.updateNO++
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
	fast_update(world) {
		//console.log(world)
		//console.log(world.ctx.full_sqwer)
		if (world.ctx.full_sqwer) {
			if (window.innerWidth > window.innerHeight) {

				world.ctx.style.width = window.innerHeight - (parseInt(world.ctx.style.borderLeftWidth) + parseInt(world.ctx.style.borderRightWidth)).toString() + "px"
				world.ctx.style.height = window.innerHeight - (parseInt(world.ctx.style.borderBottomWidth) + parseInt(world.ctx.style.borderTopWidth)).toString() + "px"

				world.width_px = window.innerHeight
				world.height_px = window.innerHeight
			} else {

				world.ctx.style.width = window.innerWidth - (parseInt(world.ctx.style.borderLeftWidth) + parseInt(world.ctx.style.borderRightWidth)).toString() + "px"
				world.ctx.style.height = window.innerWidth - (parseInt(world.ctx.style.borderBottomWidth) + parseInt(world.ctx.style.borderTopWidth)).toString() + "px"

				world.width_px = window.innerWidth
				world.height_px = window.innerWidth
			}

		}


	}
	constructor(screen_size = new location2D(10, 10)) {


		this.grid = []
		this.updateNO = 0



		this.ctx = document.getElementsByTagName("canvas")[0]
		this.ctx.size = screen_size
		this.fast_update_o = setInterval(this.fast_update, 10, this)
		this.ctx.full_sqwer = false
		//this.ctx.getContext("2d").clearRect(0, 0, this.ctx.width, this.ctx.height);
		//this.update_timer = setInterval(this.update, 10)




		//this.start()
	}
}
class basce {
	start() { }
	update(x) { }
	damage() { }

	scail = new location2D(1, 1)
	constructor(w) {
		var me = this
		try {
			if (w.constructor == world) {
				Object.keys(w.setings.default[me.constructor.name]).forEach(function (key) {
					if (typeof (w.setings.default[me.constructor.name][key]) == typeof ("")) {
						var m = "me." + key + " = '" + w.setings.default[me.constructor.name][key] + "'"
					} else {
						var m = "me." + key + " = " + w.setings.default[me.constructor.name][key]
					}
					console.log(m)
					eval(m)
				})
			}



			this.this_world = w
			this.this_world.grid.push(this)




		} catch (e) {


		}
	}
}
class visible extends basce {
	visible = {
		colour_or_img: true,
		colour: "hsl(0, 0%, 80%)"
	}
}
class physics extends visible {
	physics = {
		solid: true

	}
	location = undefined
	visible = {
		colour_or_img: true,
		colour: "hsl(0, 0%, 80%)"
	}
	constructor(w, location) {
		super(w)
		this.location = location

	}
}

class camera extends basce {
	ctx = undefined
	update(x) { }
	draw() {

		var ctx = this.ctx //define stuff
		var ctx_reder = ctx.getContext("2d")
		var xs = ctx.width
		var ys = ctx.height
		var by = ys / ctx.size.y
		var bx = xs / ctx.size.x


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
	constructor(w, ctx) {
		super(w)
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