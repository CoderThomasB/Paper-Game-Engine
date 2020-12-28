class World {

	/**
	 * timed_update is meant for being called at an interval to stop infinite updates.
	 */
	timed_update() {
		this.All_objects.forEach((element) => {
			try {
				element.timed_update(this.update_number)
			} catch (error) { }
		})
		this.update_number++
	}

	/**
	 * the update function is meant to update all the aspects fo all the objects can be called if something changes.
	 * runs all the update functions in all the objects and adds one to the update_number.
	 */
	update() {
		this.All_objects.forEach((element, index) => {
			try {
				element.update(this.update_number)
			} catch (error) { }
		})
		this.update_number++
	}
	/**
	 * can be called when the all the things are setup is smiler to the update function but is only meant to be used once.
	 */
	start() {
		this.All_objects.forEach((element, index) => {
			element.start()
		})
	}
	/**
	 * @param {Vector2} location
	 * @param {Object} self_
	 * @returns {Array}
	 * gets all the object's at a location.
	 */
	get_at_location(location, self_ = null) {

		var _ = new Set()
		this.All_objects.forEach((element, index) => {
			if (element.get_true_location().equals(location)) {
				if (element !== self_) {
					_.add(element)
				}
			}
		})
		return _
	}
	get All_objects() {
		var _ = new Set()
		this.objects.forEach((element, index) => {
			try {
				_ = new Set([..._, ...element.All_objects])
			} catch (e) { }
			_.add(element)
		})
		return _
	}
	constructor() {
		this.objects = new Set()// a Set with all the objects in it.
		this.update_number = 0	// the number of updates that have happened.
		this.size = undefined	// if this is a Vector2 then that is the size limit of the world from 0 to 'x' and 0 to 'y'.
	}

}
export { World }