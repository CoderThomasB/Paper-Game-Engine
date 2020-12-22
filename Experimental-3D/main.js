//import "../main"
//import * as Three from "./three"

globalThis.world_3D = class world_3D extends world {
	constructor() {
		super()

		this.Three_Scene = new THREE.Scene()

		console.log(this.Three_Scene)
	}
}

globalThis.camera_3D = class camera_3D extends Abstract_camera {
	/**
	 * @param {world_3D} New_world the world this the object is in.
	 * @param {THREE.vector3} New_location the location of the object.
	 * @param {HTMLCanvasElement} ctx the Canvas used for drawing.
	 * @param {Number} fov
	 * @param {Boolean} is_auto_draw
	 * @param {Boolean} auto_find_ctx_size
	 * @param {Number} width
	 * @param {Number} height
	 * @param {Number} near
	 * @param {Number} far
	 * @param {Boolean} draw_on_timed_update an option for auto drawing on timed_update.
	 */
	constructor(New_world, position, ctx, fov, is_auto_draw = true, auto_find_ctx_size = true, width = undefined, height = undefined, near = 0.1, far = 1000) {
		super(New_world, undefined, ctx, false)

		if (height === undefined) { height = ctx.height }
		if (width === undefined) { width = ctx.width }

		console.log(height, width)


		this.Three_Camera = new THREE.PerspectiveCamera(fov, 1, near, far)
		this.Three_Renderer = new THREE.WebGLRenderer({ canvas: ctx });
		this.change_render_size(width, height)

		this.auto_find_ctx_size = auto_find_ctx_size
		this.position = position
		this.is_auto_draw = is_auto_draw

		if (this.is_auto_draw) {
			this.auto_draw()
		}
	}
	change_render_size(width, height) {
		this.Three_Renderer.setSize(width, height, false)
		let new_aspect = width / height
		if (new_aspect !== this.Three_Camera.aspect) {
			this.Three_Camera.aspect = new_aspect
			this.Three_Camera.updateProjectionMatrix()
		}
	}
	draw() {

		let now = Date.now()

		if (this.last_draw === undefined) {
			this.last_draw = now
		}

		let delta = now - this.last_draw
		this.last_draw = now

		if (this.auto_find_ctx_size) {
			this.change_render_size(this.ctx.clientWidth, this.ctx.clientHeight)
		}

		this.Parent_Container.objects.forEach((object) => {
			try {
				object.before_draw(object, delta)
			} catch (e) { }
			try {
				object.visible.forEach((render_component) => {
					try {
						render_component.before_draw(render_component, object, delta)
					} catch (e) { }
				})
			} catch (e) { }
		})

		this.Three_Renderer.render(
			this.Parent_Container.Three_Scene,
			this.Three_Camera
		)
	}
	auto_draw() {
		if (this.is_auto_draw) {
			requestAnimationFrame(this.auto_draw.bind(this))
		}
		this.draw()
	}
	set position(input) { this.Three_Camera.position.copy(input) }
	get position() { return this.Three_Camera.position }
}

class visible_3D extends base {
	/**
	 * @param {THREE.Geometry} geometry
	 * @param {THREE.Material} material
	 * 
	 * @param {world_3D} New_world 
	 * @param {THREE.THREE.vector3} New_location 
	 */
	constructor(New_world, New_location, geometry, material) {
		super(New_world, New_location)

		this.Three_Group = new THREE.Group()
		this.Parent_Container.Three_Scene.add(this.Three_Group)

		this.visible = [
			new render_component_3D(
				geometry,
				material,
				this.Three_Group
			)
		]
	}
	/**
	 * this function is called just before the object is drawn
	 */
	before_draw(self, delta) {

	}

	set name(input) { this.Three_Group.name = input }
	get name() { return this.Three_Group.name }
}

class cube extends visible_3D {
	/**
	 * @param {THREE.Material} material
	 * 
	 * @param {world_3D} New_world 
	 * @param {THREE.THREE.vector3} New_location 
	 */
	constructor(New_world, New_location, material) {
		super(New_world, New_location, new THREE.BoxGeometry(), material)
	}
}

class render_component_3D {
	/**
	 * @param {Object} shape the shape of the component
	 * @param {String} colour the colour of the component
	 */
	constructor(geometry, material, parent) {
		this.geometry = geometry
		this.material = material
		this.mesh = new THREE.Mesh(this.geometry, this.material);
		parent.add(this.mesh)
	}
	before_draw(the_render_component, object, delta) {

	}

	set Cast_Shadow(input) { this.mesh.castShadow = input }
	get Cast_Shadow() { return this.mesh.castShadow }

	set position(input) { this.Three_Camera.position.copy(input) }
	get position() { return this.mesh.position }
}