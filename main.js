
class location2D {
	constructor(x = Number.NaN, y = Number.NaN) {
		this.x = x
		this.y = y
	}

	is_equal(other) {
		return other.x == this.x && other.y == this.y
	}
	set_add(other) {
		this.x += other.x
		this.y += other.y
	}
	add(other) {
		return new location2D(this.x + other.x, this.y + other.y)
	}
	times(other){
		return new location2D(this.x * other.x, this.y * other.y)
	}
	mack_copy() {
		return new location2D(this.x, this.y)

	}
	toString(){
		return `{"x": ${this.x},"y": ${this.y}}`
	}
}


class world {
	// Safari dose not do this
	//grid = [] // a list with all the objects in it
	//update_number = 0 // the number of updates that have happened
	//size = undefined // if this is a location2D then that is the size limit of the world from 0 to 'x' and 0 to 'y'

	update() {
		var me = this
		me.grid.forEach(function (c_block) {
			c_block.update(me.updateNO)

		})
		me.update_number++
	}
	physics_update() {
		let now = Date.now();
		let Delta = now - this.last_physics_update
		var me = this
		me.grid.forEach(function (c_block) {
			try{
				c_block.physics_update(Delta)
			} catch (error){
				if(error.constructor != TypeError){
					console.error(error)
				}
			}

		})
		this.last_physics_update = now
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
	physics_get_at_location(location, self_ = null) {
		var b = []
		this.grid.forEach(function (c_block) {
			if (self_ != c_block) {
				try{
					if (c_block.check_collision(location)) {
						b.push(c_block)
					}
				} catch(error) {
					if(error.constructor != TypeError){
						console.error(error)
					}
				}
			}

		})
		return b
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
	constructor(){
		this.grid = [] // a list with all the objects in it
		this.update_number = 0 // the number of updates that have happened
		this.size = undefined // if this is a location2D then that is the size limit of the world from 0 to 'x' and 0 to 'y'
		this.last_physics_update = Date.now();
	}
	
}
class base {
	start() { }
	update(x) { }
	damage(amount) { }
	destroy() {
		this.this_world.grid.splice(this.this_world.get_in_grid(this),1)
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

	before_draw(){

	}
	
	constructor(New_world, New_location) {
		super(New_world, New_location)
		this.visible = {
			colour_or_img: true,
			scail: new location2D(1, 1),
			colour: "hsl(0, 0%, 80%)"
		}
	}
}
class physics extends visible {
	/*physics = {
		solid: true
	}*/
	move (direction){
		this.location = this.location.add(get_direction_as_location2D(direction))
		if(!check(this.location, this.this_world, this)){
			console.log("INVALID MOVE")
			this.move(get_opposite_direction(direction))
		}
		this.this_world.update()
	}
	constructor(New_world, New_location) {
		super(New_world, New_location)
		this.physics = {
			solid: true
		}
	}
	
}

class More_physics extends physics {
	
	check_collision(location){
		return	(location.x > this.location.x
				&&
				location.x < this.location.add(new location2D(1,1)).x)

				&&

				(location.y > this.location.y
				&&
				location.y < this.location.add(new location2D(1,1)).y)
	}

	apply_forces(forces){
		this.physics.velocity = this.physics.velocity.add(new location2D((forces.x / this.physics.mass), (forces.y / this.physics.mass)))
	}

	physics_update(Delta_Time){
		if(Delta_Time > 20){
			console.log(Delta_Time)
		}

		let thing = undefined
		thing = this.this_world.physics_get_at_location(this.location, this)[0]
		if(thing == undefined){thing = this.this_world.physics_get_at_location(this.location.add(new location2D(0,0.5)), this)[0]}
		if(thing == undefined){thing = this.this_world.physics_get_at_location(this.location.add(new location2D(0.5,0)), this)[0]}
		if(thing == undefined){thing = this.this_world.physics_get_at_location(this.location.add(new location2D(0,1)), this)[0]}
		if(thing == undefined){thing = this.this_world.physics_get_at_location(this.location.add(new location2D(1,0)), this)[0]}
		if(thing == undefined){thing = this.this_world.physics_get_at_location(this.location.add(new location2D(0.5,1)), this)[0]}
		if(thing == undefined){thing = this.this_world.physics_get_at_location(this.location.add(new location2D(1,0.5)), this)[0]}
		if(thing == undefined){thing = this.this_world.physics_get_at_location(this.location.add(new location2D(1,1)), this)[0]}
		if(thing != undefined && thing != this.physics.last_collision){
			let other = thing.physics.velocity

			thing.physics.velocity = this.physics.velocity
			
			this.physics.velocity = other
		}

		this.physics.last_collision = thing
		if(thing == undefined){
			this.physics.last_collision = undefined
		}

		if(this.location.x < 0){
			//this.location = this.location.add(new location2D(0.1,0))
			this.physics.velocity.x =  Math.abs(this.physics.velocity.x)
		}
		if(this.location.y < 0){
			//this.location = this.location.add(new location2D(0,0.1))
			this.physics.velocity.y = Math.abs(this.physics.velocity.y)
		}

		if(this.location.x >= 9){
			//this.location = this.location.add(new location2D(-0.1,0))
			this.physics.velocity.x = Math.abs(this.physics.velocity.x) * -1
		}
		if(this.location.y >= 9){
			//this.location = this.location.add(new location2D(0,-0.1))
			this.physics.velocity.y = Math.abs(this.physics.velocity.y) * -1
		}

		this.location = this.location.add(this.physics.velocity.times(new location2D((Delta_Time / 1000), (Delta_Time / 1000))))
	}

	constructor(New_world, New_location) {
		super(New_world, New_location)
		this.physics = {
			solid: true,
			mass: 1,
			velocity: new location2D(0,0),
			last_collision: undefined,
		}
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
	constructor(){
		super()
		message = "Input is not a direction!"
	}
}


class camera extends base {
	
	update(x) {
		if(this.draw_on_update){
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
			try{
				c_block.before_draw()
			}catch(error){
				console.error(error)
			}
			if (c_block.visible.colour_or_img) {

				ctx_reder.fillStyle = c_block.visible.colour //select color
				ctx_reder.fillRect(x * b_size_x - (me.location.x * b_size_x), y * b_size_y  - (me.location.y * b_size_y), b_size_x * c_block.visible.scail.x, b_size_y * c_block.visible.scail.y) //fill color
			} else {
				//console.log(c_block.visible)
				ctx_reder.drawImage(c_block.visible.img, x * b_size_x  - (me.location.x * b_size_x), y * b_size_y  - (me.location.y * b_size_y), b_size_x * c_block.visible.scail.x, b_size_y * c_block.visible.scail.y)// display img
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
		) && 
		(location.x >= 0 && location.y >= 0))
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
