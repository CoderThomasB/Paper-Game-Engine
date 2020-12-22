
class spinning_cube extends cube {
	constructor(New_world, New_location, material, speed = 0.001){
		super(New_world, New_location, material)

		this.speed = speed
	}
	before_draw(self, delta) {
		self.Three_Group.rotation.x += this.speed * delta
		self.Three_Group.rotation.y += this.speed * delta
	}
}

var The_world = new world_3D()
var The_camera = new camera_3D(The_world, new THREE.Vector3(0, 0, 2), document.getElementsByTagName("canvas")[0], 75, true)
var The_cube = new spinning_cube(The_world, new THREE.Vector3(0, 0, 0), new THREE.MeshBasicMaterial({ color: 0x00ff00 }))

The_world.Three_Scene.fog = new THREE.Fog(new THREE.Color( 0x000000 ), 0, 3)