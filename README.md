# The Paper Game-Engine
## This is an unfinished Game Engine!

Paper is a basic game engine

### documentation:
#### world:
```javascript
The_world = new world() // creats a new world


The_world.grid // an list whith all the objets in it

The_world.update() // runs all the update funshons in all the grid objets and adds one to the update_number
The_world.update_number // the number of updates that have haponed

The_world.start() // runs the startfunshons in all the grid objets

The_world.get_in_grid(objet) // gets the grid number of an objets given that objets

The_world.get_at_location(location) // gets the grid objets whith the same location
```

#### basce:
the basce is a basce for all the objets in the world
```javascript
The_world = new world() // creats a new world

The_basce = new basce(
  The_world,               // the world that the objet will be in
  new location2D(0, 0)     // the location
)                          // creats a new world

```

#### visible:
visible is a exstanshon on basce is alaws the object to be draw whith a camera
```javascript
The_world = new world() // creats a new world

The_visible = new visible(
  The_world,               // the world that the objet will be in
  new location2D(0, 0)     // the location
)      // creats a new world

The_visible.visible.colour_or_img  // a boolen on wether the camera shode use colour or images
The_visible.visible.colour         // if colour_or_img is true then this is the colour used

```

#### camera:
```javascript
The_world = new world() // creats a new world

The_camera = new camera(  // creats a new camera
  The_world,              // the world that it is in is The_world
  new location2D(0, 0),   // the location
  document.getElementsByTagName("canvas")[0] // the canvas to draw to
  )

The_camera.draw() // draws all the objets in the world on to the canvas


function Draw() {
	The_camera.draw()
}
draw = setInterval(Draw, 10) // this can be a good way to do live updating 

```

#### physics:
physics is a exstanshon on visible is alaws the object to have basic physics adtrbuts and be solid

##### NOT WORKING
```javascript
The_world = new world() // creats a new world

The_physics = new physics(
  The_world,               // the world that the objet will be in
  new location2D(0, 0)     // the location
)      // creats a new world

The_physics.physics.solid  // this determons whther the objet is solid

```
