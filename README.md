# The Paper Game-Engine
## This is an unfinished Game Engine!

Paper is a basic game engine dezized for gride based games

### documentation:
#### world:
```javascript
The_world = new world() // creates a new world


The_world.grid // a list with all the objects in it

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

```

#### camera:
```javascript
The_world = new world() // creates a new world

The_camera = new camera(  // creates a new camera
  The_world,              // the world that it is created in is The_world
  new location2D(0, 0),   // the location
  document.getElementsByTagName("canvas")[0] // the canvas to draw to
  )

The_camera.draw() // draws all the objects in the world on to the canvas


function Draw() {
	The_camera.draw()
}
draw = setInterval(Draw, 10) // this can be a good way to do live updating 

```

#### physics:
physics is a extension on visible it allows the object to have basic physics attributes and be solid

##### NOT WORKING
```javascript
The_world = new world() // creates a new world

The_physics = new physics(
  The_world,               // the world that the object will be in
  new location2D(0, 0)     // the location
)      // creats a new world

The_physics.physics.solid  // this determines whether the object is solid

```
