/**
 * @param {Vector2} location the location to check.
 * @param {world} The_world the world to check in.
 * @param {Object} self_ the function will not included this in the output
 * @returns {Boolean}
 * true is valid and false is invalid
 */
function check(location, The_world, self_) {
	let is = true
	is = check_out_of_world(location, The_world) && is
	is = check_is_in_solid(location, The_world, self_) && is
	return is
}

/**
 * @param {Vector2} location the location to check.
 * @param {world} The_world the world to check in.
 * @returns {Boolean}
 * true is valid and false is invalid
 * only checks if the location is out of the world 'size'
 */
function check_out_of_world(location, The_world) {
	if (The_world.size === undefined) {
		return true
	}
	let is_out_of_world =
		((location.x < The_world.size.x
			&&
			location.y < The_world.size.y
		) &&
			(location.x >= 0 && location.y >= 0))
	return is_out_of_world
}

/**
 * @param {Vector2} location the location to check.
 * @param {world} The_world the world to check in.
 * @param {Object} self_ the function will not included this in the output
 * @returns {Boolean}
 * true is valid and false is invalid
 * only checks if the location is occupied by a solid object
 */
function check_is_in_solid(location, The_world, self_) {
	let is_in_solid = false
	The_world.get_at_location(location, self_).forEach((Thing) => {
		if (Thing.physics != undefined) {
			is_in_solid = Thing.physics.solid || is_in_solid
		}
	})
	return !is_in_solid
}

export { check }