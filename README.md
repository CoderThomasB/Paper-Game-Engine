# The Paper Game-Engine
## This is an unfinished Game Engine!

Paper is a basic game engine designed for grid-based games

### documentation:
#### world:
```javascript
The_world = new world() // creates a new world


The_world.grid // a list with all the objects in it
The_world.size // you can use this to set a size limit on your world

The_world.update() // runs all the update functions in all the grid objects and adds one to the update_number
The_world.update_number // the number of updates that have happened

The_world.start() // runs the start functions in all the grid objects

The_world.get_in_grid(object) // gets the grid number of an object given that object

The_world.get_at_location(location) // gets the grid objects whith the same location
```

#### base:
the base is a base for all the objects in the world
```javascript
The_world = new world() // creates a new world

The_base = new base(
  The_world,               // the world that the object will be in
  new location2D(0, 0)     // the location
)                          // creates a new world

The_base.start() // the function that is called when the one in The_world is called (is not called from the world's constructor ) 
The_base.update(update_number) // the function that is called when the one in The_world is called with the update_number from The_world as an input

The_base.damage(amount) // a universal place holder function that might be used for varying some kind of health
The_base.destroy() // used for destroying or unliking an object (note the object is not deleted instead its this_world attribute is set to zero to the world is set to undefine)

The_base.this_world // the objects rerents to the The_world
The_base.location // a location2D with the location of the object

```

#### visible:
visible is an extension of the base and it adds the ability to be drawn with a camera
```javascript
The_world = new world() // creates a new world

The_visible = new visible(
  The_world,               // the world that the object will be in
  new location2D(0, 0)     // the location
)      // creates a new world

The_visible.visible.colour_or_img  // a boolen on whether the camera should use colour or images
The_visible.visible.colour         // if colour_or_img is true then this is the colour used
The_visible.visible.img	           // if colour_or_img is false then this is the img used like this \/
The_visible.visible.img = document.getElementById("img")
The_visible.visible.scail	   // the size or scail of an object

```

#### camera:
```javascript
The_world = new world() // creates a new world

The_camera = new camera(  // creates a new camera
  The_world,              // the world that it is created in is The_world
  new location2D(0, 0),   // the location
  document.getElementsByTagName("canvas")[0], // the canvas to draw to
  new location2D(10, 10), // the size of the view
  false                   // this is the draw_on_update it deteroms if a draw is prefrmd on update
  )

The_camera.draw() // draws all the objects in the world on to the canvas
The_camera.ctx    // this the canvas used
The_camera.draw_on_update // draw_on_update deteroms if a draw is prefrmd on update


function Draw() {
	The_camera.draw()
}
draw = setInterval(Draw, 10) // this can be a good way to do live updating 

```

#### physics:
physics is an extension on visible it allows the object to have basic physics attributes and be solid

##### NOT FULLY WORKING
```javascript
The_world = new world() // creates a new world

The_physics = new physics(
  The_world,               // the world that the object will be in
  new location2D(0, 0)     // the location
)      // creats a new world

The_physics.physics.solid  // this determines whether the object is solid
The_physics.move(directions) // this function moves the object a certain direction like directions.up. it can not move into a solid object or out of the world!

```
