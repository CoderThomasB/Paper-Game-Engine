import { World } from "./World"

class Base {
	/**
	 * this function get called when the world's start function is called.
	 */
	start() { }
	/**
	 * @param {Number} update_number the update_number is the number of updates since world creation.
	 * this function get called when the world's update function is called.
	 */
	update(update_number) { }
	/**
	 * @param {Number} amount the amount of damage.
	 * this is not used in the main file but it is hire for compatibility.
	 */
	damage(amount) { }
	/**
	 * this is used for deleting and removing references to the object.
	 */
	destroy() {
		this.Parent_Container.objects.delete(this)
		this.Parent_Container = null
	}

	/**
	 * @returns {World}
	 */
	get Containing_World() {
		if (this.Parent_Container instanceof World) {
			return this.Parent_Container
		} else {
			return this.Parent_Container.Containing_World
		}
	}

	/**
	 * @returns {Vector2}
	 */
	get_true_location() {
		if (this.Parent_Container instanceof World) {
			return this.location.clone()
		} else {
			return this.location.clone().add(this.Parent_Container.get_true_location())
		}
	}

	/**
	 * @param {Vector2} input
	 * @returns {Vector2}
	 */
	set_true_location(input) {
		if (this.Parent_Container instanceof World) {
			this.location = input.clone()
			return this.get_true_location()
		} else {
			this.location = input.clone().sub(this.Parent_Container.get_true_location())
			return this.get_true_location()
		}
	}

	/**
	 * @param {world} The_Container the Container this the object is in.
	 * @param {Vector2} New_location the location of the object.
	 */
	constructor(The_Container, New_location) {
		this.Parent_Container = The_Container
		this.Parent_Container.objects.add(this)
		this.location = New_location
	}
}

export { Base }