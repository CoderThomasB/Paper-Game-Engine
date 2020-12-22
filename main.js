/*
The Paper Game Engine by Thomas Booker is licensed under CC BY 4.0. To view a copy of this license, visit https://creativecommons.org/licenses/by/4.0
see the LICENSE file
*/


globalThis.Vector2 = class Vector2 {
	constructor(x = 0, y = 0) {
		Object.defineProperty(this, 'isVector2', { value: true });
		this.x = x;
		this.y = y;
	}
	get width() {
		return this.x;
	}
	set width(value) {
		this.x = value;
	}
	get height() {
		return this.y;
	}
	set height(value) {
		this.y = value;
	}
	set(x, y) {
		this.x = x;
		this.y = y;
		return this;
	}
	setScalar(scalar) {
		this.x = scalar;
		this.y = scalar;
		return this;
	}
	setX(x) {
		this.x = x;
		return this;
	}
	setY(y) {
		this.y = y;
		return this;
	}
	setComponent(index, value) {
		switch (index) {
			case 0: this.x = value; break;
			case 1: this.y = value; break;
			default: throw new Error('index is out of range: ' + index);
		}
		return this;
	}
	getComponent(index) {
		switch (index) {
			case 0: return this.x;
			case 1: return this.y;
			default: throw new Error('index is out of range: ' + index);
		}
	}
	clone() {
		return new this.constructor(this.x, this.y);
	}
	copy(v) {
		this.x = v.x;
		this.y = v.y;
		return this;
	}
	add(v, w) {
		if (w !== undefined) {
			console.warn('THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
			return this.addVectors(v, w);
		}
		this.x += v.x;
		this.y += v.y;
		return this;
	}
	addScalar(s) {
		this.x += s;
		this.y += s;
		return this;
	}
	addVectors(a, b) {
		this.x = a.x + b.x;
		this.y = a.y + b.y;
		return this;
	}
	addScaledVector(v, s) {
		this.x += v.x * s;
		this.y += v.y * s;
		return this;
	}

	sub(v, w) {
		if (w !== undefined) {
			console.warn('THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
			return this.subVectors(v, w);
		}
		this.x -= v.x;
		this.y -= v.y;
		return this;
	}

	subScalar(s) {
		this.x -= s;
		this.y -= s;
		return this;
	}

	subVectors(a, b) {
		this.x = a.x - b.x;
		this.y = a.y - b.y;
		return this;
	}

	multiply(v) {
		this.x *= v.x;
		this.y *= v.y;
		return this;
	}

	multiplyScalar(scalar) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	}

	divide(v) {
		this.x /= v.x;
		this.y /= v.y;
		return this;
	}

	divideScalar(scalar) {
		return this.multiplyScalar(1 / scalar);
	}
	applyMatrix3(m) {
		const x = this.x, y = this.y;
		const e = m.elements;
		this.x = e[0] * x + e[3] * y + e[6];
		this.y = e[1] * x + e[4] * y + e[7];
		return this;
	}
	min(v) {
		this.x = Math.min(this.x, v.x);
		this.y = Math.min(this.y, v.y);
		return this;
	}
	max(v) {
		this.x = Math.max(this.x, v.x);
		this.y = Math.max(this.y, v.y);
		return this;
	}
	clamp(min, max) {
		// assumes min < max, componentwise
		this.x = Math.max(min.x, Math.min(max.x, this.x));
		this.y = Math.max(min.y, Math.min(max.y, this.y));
		return this;
	}
	clampScalar(minVal, maxVal) {
		this.x = Math.max(minVal, Math.min(maxVal, this.x));
		this.y = Math.max(minVal, Math.min(maxVal, this.y));
		return this;
	}
	clampLength(min, max) {
		const length = this.length();
		return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
	}
	floor() {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	}
	ceil() {
		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		return this;
	}
	round() {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	}
	roundToZero() {
		this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x);
		this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y);
		return this;
	}
	negate() {
		this.x = - this.x;
		this.y = - this.y;
		return this;
	}
	dot(v) {
		return this.x * v.x + this.y * v.y;
	}
	cross(v) {
		return this.x * v.y - this.y * v.x;
	}
	lengthSq() {
		return this.x * this.x + this.y * this.y;
	}
	length() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	manhattanLength() {
		return Math.abs(this.x) + Math.abs(this.y);
	}
	normalize() {
		return this.divideScalar(this.length() || 1);
	}
	angle() {
		// computes the angle in radians with respect to the positive x-axis
		const angle = Math.atan2(- this.y, - this.x) + Math.PI;
		return angle;
	}
	distanceTo(v) {
		return Math.sqrt(this.distanceToSquared(v));
	}
	distanceToSquared(v) {
		const dx = this.x - v.x, dy = this.y - v.y;
		return dx * dx + dy * dy;
	}
	manhattanDistanceTo(v) {
		return Math.abs(this.x - v.x) + Math.abs(this.y - v.y);
	}
	setLength(length) {
		return this.normalize().multiplyScalar(length);
	}
	lerp(v, alpha) {
		this.x += (v.x - this.x) * alpha;
		this.y += (v.y - this.y) * alpha;
		return this;
	}
	lerpVectors(v1, v2, alpha) {
		this.x = v1.x + (v2.x - v1.x) * alpha;
		this.y = v1.y + (v2.y - v1.y) * alpha;
		return this;
	}
	equals(v) {
		return ((v.x === this.x) && (v.y === this.y));
	}
	fromArray(array, offset = 0) {
		this.x = array[offset];
		this.y = array[offset + 1];
		return this;
	}
	toArray(array = [], offset = 0) {
		array[offset] = this.x;
		array[offset + 1] = this.y;
		return array;
	}
	fromBufferAttribute(attribute, index, offset) {
		if (offset !== undefined) {
			console.warn('THREE.Vector2: offset has been removed from .fromBufferAttribute().');
		}
		this.x = attribute.getX(index);
		this.y = attribute.getY(index);
		return this;
	}

	rotateAround(center, angle) {
		const c = Math.cos(angle), s = Math.sin(angle);
		const x = this.x - center.x;
		const y = this.y - center.y;
		this.x = x * c - y * s + center.x;
		this.y = x * s + y * c + center.y;
		return this;
	}
	random() {
		this.x = Math.random();
		this.y = Math.random();
		return this;
	}
}


globalThis.world = class world {

	/**
	 * timed_update is meant for being called at an interval to stop infinite updates.
	 */
	timed_update() {
		this.objects.forEach((element) => {
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
		this.objects.forEach((element, index) => {
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
		this.objects.forEach((element, index) => {
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
		this.objects.forEach((element, index) => {
			if (element.get_true_location().equals(location)) {
				if (element !== self_) {
					_.add(element)
				}
			}
		})
		return _
	}
	/**
	 * 
	 */
	constructor() {
		this.objects = new Set()// a Set with all the objects in it.
		this.update_number = 0	// the number of updates that have happened.
		this.size = undefined	// if this is a Vector2 then that is the size limit of the world from 0 to 'x' and 0 to 'y'.
	}

}

globalThis.base = class base {
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
		if (this.Parent_Container instanceof world) {
			return this.Parent_Container
		} else {
			return this.Parent_Container.Containing_World
		}
	}

	/**
	 * @returns {Vector2}
	 */
	get_true_location() {
		if (this.Parent_Container instanceof world) {
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
		if (this.Parent_Container instanceof world) {
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

globalThis.container = class container extends base {
	constructor(The_Container, New_location) {
		super(The_Container, New_location)
		this.objects = new Set()
	}
	add(object) {
		if (object.Containing_World !== this.Containing_World) {
			throw new Error("can not add a object from a different world")
		}
		this.objects.add(object)
		object.Parent_Container = this
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
}

globalThis.visible = class visible extends base {
	/**
	 * this function is called just before the object is drawn
	 */
	before_draw() {

	}
	/**
	 * @param {world} The_Container the world that the object is in.
	 * @param {Vector2} New_location the location of the object.
	 */
	constructor(The_Container, New_location) {
		super(The_Container, New_location)

		this.visible =
			[new render_component(
				new rectangle(new Vector2(1, 1)),
				"hsl(0, 0%, 80%)"
			)
			]
	}
}

globalThis.basic_physics = class basic_physics extends visible {
	/**
	 * moves the object in a direction but not in to solid object (triggers an update)
	 * @param {Number} direction the location of the object.
	 */
	move(direction) {
		this.location.add(get_direction_as_Vector2(direction))
		if (!check(this.location, this.Containing_World, this)) {
			//console.log("INVALID MOVE")
			this.move(get_opposite_direction(direction))
			return false
		}
		this.Containing_World.update()
		return true
	}
	/**
	 * @param {world} The_Container the Container this the object is in.
	 * @param {Vector2} New_location the location of the object.
	 */
	constructor(The_Container, New_location) {
		super(The_Container, New_location)
		this.physics = {
			solid: true
		}
	}

}

globalThis.practical_emitter = class practical_emitter {
	/**
	 * 
	 * @param {base_practical} practical_Type 
	 * @param {render_component[]} visible_list 
	 * @param {Number} creation_interval
	 */
	constructor(practical_Type, visible_list, creation_interval = 0) {
		this.practical_Type = practical_Type
		this.visible_list = visible_list
		this.practicals = new Set()
		if (creation_interval > 0) {
			this.creation_interval = setInterval(() => { this.create_practical() }, creation_interval)
		}
	}
	create_practical() {
		let practical_Type = this.practical_Type
		let practical = new practical_Type(this.visible_list, this)
		return practical
	}
}

globalThis.base_practical = class base_practical {
	/**
	 * 
	 * @param {render_component[]} visible_list 
	 * @param {practical_emitter} practical_manager
	 */
	constructor(visible_list, practical_manager) {
		this.velocity = new Vector2() // meshed in units per second

		this.practical_manager = practical_manager
		this.attached_visible_list = visible_list
		this.attached_render_component = new render_component(new rectangle(new Vector2(0.1, 0.1)), "black")
		this.visible_list_number = this.attached_visible_list.push(this.attached_render_component)
		this.practical_list_number = this.practical_manager.practicals.add(this)
		this.attached_render_component.before_draw = () => {
			this.before_draw()
		}
		this.last_time = Date.now()
		this.start_time = this.last_time
	}
	get_delta_time() {
		if (this.last_time !== undefined) {
			let delta_time = Date.now() - this.last_time
			this.last_time = Date.now()
			return delta_time
		} else {
			this.last_time = Date.now()
			return 0
		}
	}
	before_draw() {
		let delta_time = this.get_delta_time() / 1000
		this.attached_render_component.offset.add(this.velocity.clone().multiplyScalar(delta_time))

		if (Date.now() - this.start_time > this.max_existence_time) {
			this.destroy()
		}

	}
	check_and_repair_visible_list_number() {
		if (this.attached_visible_list[this.visible_list_number] === this.attached_render_component) {
			return true
		} else {
			for (let i = 0; i < this.attached_visible_list.length; i++) {
				if (this.attached_visible_list[i] === this.attached_render_component) {
					this.visible_list_number = i
				}
			}
		}
	}
	remove_frome_practicals_list() {
		this.practical_manager.practicals.delete(this)
	}
	remove_frome_visible_list() {
		this.check_and_repair_visible_list_number()
		this.attached_visible_list.splice(this.visible_list_number, 1)
	}
	destroy() {
		this.remove_frome_practicals_list()
		this.remove_frome_visible_list()
	}
}

globalThis.sound_component = class sound_component {
	/**
	 * @param {String} sound_src the src of the sound
	 * @param {Boolean} loop determines if the sound will loop
	 */
	constructor(sound_src, loop = false) {
		this.HTML_sound = document.createElement("audio");
		this.HTML_sound.src = sound_src;
		this.HTML_sound.loop = loop;
		this.HTML_sound.setAttribute("preload", "auto");
		this.HTML_sound.setAttribute("controls", "none");
		this.HTML_sound.style.display = "none";
		document.head.appendChild(this.HTML_sound);
	}
}

/* animation example var 'a = new animation([
	new keyframe(0, "a", 2, keyframe_types.liner),
	new keyframe(10, "a", 3, keyframe_types.liner),
	new keyframe(20, "a", -1, keyframe_types.liner)
	], 0, 20)'
*/
/*
	var _ = new animation([
		new keyframe(0, "x", 0, keyframe_types.liner),
		new keyframe(175, "x", 9, keyframe_types.liner),
		new keyframe(200, "x", 0, keyframe_types.liner)
		], 0, 200)
*/

globalThis.animation = class animation {
	/**
	 * 
	 * @param {Array<keyframe>} keyframes 
	 * @param {Number} start
	 * @param {Number} end
	 */
	constructor(keyframes, start, end) {
		this.keyframes = keyframes
		this.now = start
		this.start = start
		this.end = end
	}
	/**
	 * goes to the start of the animation
	 */
	goto_start() {
		this.now = this.start
		return this.now
	}
	/**
	 * goes to the end of the animation
	 */
	goto_end() {
		this.now = this.end
		return this.now
	}
	/**
	 * step 1 time unit forward
	 */
	step() {
		this.now += 1
		return this.now
	}
	/**
	 * gets all the keyframes with an attribute
	 * @param {String} attribute the attribute that the keyframes will match
	 */
	get_keyframes_with_attribute(attribute) {
		let _ = []
		this.keyframes.forEach((keyframe) => {
			if (keyframe.attribute === attribute) {
				_.push(keyframe)
			}
		})
		return _
	}
	/**
	 * logs the values at every integer time white an attribute
	 * @param {String} attribute the attribute of the keyframes to log
	 */
	console_log(attribute) {
		this.goto_start()
		// i use '<=' because liner key frames need to finish
		while (this.now <= this.end) {
			console.log(this.now + " : " + this.get_attribute_value_now(attribute))
			this.step()
		}
	}
	/**
	 * apply the animation to an object. the attributes will be mapped to the object's key and the value written accordingly
	 * Mite not work curtly at the time of this commit.
	 * @param {*} object the object to animation
	 */
	apply_animation(object, step_interval) {
		this.goto_start()
		// i use '<=' because liner key frames need to finish
		var me = this
		var _ = () => {
			if (me.now <= me.end) {
				Object.keys(object).forEach((key) => {
					let value = me.get_attribute_value_now(key)
					if (value === undefined) {
						return
					} else {
						object[key] = value
					}
				})
				me.step()
			} else {
				clearImmediate(Interval)
			}
		}
		var Interval = setInterval(_, step_interval);
	}
	/**
	 * gets the value of an attribute at the 'now' frame
	 * @param {String} attribute 
	 */
	get_attribute_value_now(attribute) {
		let options = this.get_keyframes_with_attribute(attribute)
		if (options.length === 0) {
			return undefined
		}
		let closet_keyframe_behind = undefined
		let closet_keyframe_ahead = undefined
		options.forEach((keyframe) => {
			if (keyframe.time <= this.now) {
				if (closet_keyframe_behind === undefined) {
					closet_keyframe_behind = keyframe
					return
				}
				if (keyframe.time >= closet_keyframe_behind.time) {
					closet_keyframe_behind = keyframe
					return
				}
			} else {
				if (closet_keyframe_ahead === undefined) {
					closet_keyframe_ahead = keyframe
					return
				}
				if (keyframe.time < closet_keyframe_ahead.time) {
					closet_keyframe_ahead = keyframe
					return
				}
			}
		})
		if (closet_keyframe_behind === undefined) {
			return undefined
		}
		if (closet_keyframe_behind.type === keyframe_types.snap) {
			return closet_keyframe_behind.value
		}
		if (closet_keyframe_behind.type === keyframe_types.liner) {
			if (closet_keyframe_ahead === undefined) {
				return closet_keyframe_behind.value
			}
			let behind_length = this.now - closet_keyframe_behind.time
			let ahead_length = closet_keyframe_ahead.time - this.now
			let ahead_value = closet_keyframe_ahead.value
			let behind_value = closet_keyframe_behind.value
			let distance = behind_length + ahead_length



			return (
				(
					behind_value * ahead_length
				)
				+
				(
					ahead_value * behind_length
				)
			) / distance

		}
	}

}

globalThis.keyframe_types = {
	"snap": 1,
	"liner": 2
}

globalThis.keyframe = class keyframe {
	/**
	 * 
	 * @param {Number} time 
	 * @param {String} attribute 
	 * @param {Any} value 
	 */
	constructor(time, attribute, value, type = keyframe_types.snap) {
		if (type === keyframe_types.liner) {
			if (value.constructor != Number) {
				throw new error("can not be liner if value not a number")
			}
		}
		this.time = time
		this.attribute = attribute
		this.value = value
		this.type = type
	}
}

globalThis.render_component = class render_component {
	/**
	 * @param {Object} shape the shape of the component
	 * @param {String} colour the colour of the component
	 */
	constructor(shape, colour) {
		this.shape = shape
		this.offset = new Vector2(0, 0)
		this.use_colour_or_img = colour_or_img.colour
		this.colour = colour
		this.img = undefined
	}
	before_draw() {

	}
}

globalThis.animatable_function_render_component = class animatable_function_render_component extends render_component {
	/**
	 * 
	 * @param {Object} shape the shape of the component
	 * @param {String} colour the colour of the component
	 * @param {function(animatable_function_render_component): void} animation_function - take in the object and changes it - do not use last_time instead use now
	 * @param {boolean} play_on_creation 
	 */
	constructor(shape, colour, animation_function, start, end, play_on_creation = false) {
		super(shape, colour)
		this.animation_function = animation_function
		this.start = start
		this.end = end
		if (play_on_creation) {
			this.play()
		} else {
			this.stop()
		}
	}
	play() {
		this.last_time = Date.now()
		this.is_playing = true
		this.now = this.start
	}
	stop() {
		this.is_playing = false
	}
	before_draw() {
		if (this.is_playing === false) { return }
		if (this.now > this.end) { stop(); return }
		let now = Date.now()
		let delta_time = now - this.last_time
		this.now += delta_time
		this.last_time = now

		var _ = this
		this.animation_function(_)
	}
}

globalThis.animatable_keyframe_render_component = class animatable_keyframe_render_component extends render_component {
	/**
	 * 
	 * @param {Object} shape the shape of the component
	 * @param {String} colour the colour of the component
	 * @param {Animation} animation 
	 * @param {boolean} play_on_creation 
	 */
	constructor(shape, colour, animation, play_on_creation = false) {
		super(shape, colour)
		this.animation = animation
		if (play_on_creation) {
			this.play()
		} else {
			this.stop()
		}
	}
	play() {
		this.last_time = Date.now()
		this.is_playing = true
		this.animation.goto_start()
	}
	stop() {
		this.is_playing = false
	}
	before_draw() {
		if (this.is_playing === false) { return }
		if (this.animation.now > this.animation.end) { stop(); return }
		let now = Date.now()
		let delta_time = now - this.last_time
		this.animation.now += delta_time
		this.last_time = now

		let offset_x = this.animation.get_attribute_value_now("offset.x")
		let offset_y = this.animation.get_attribute_value_now("offset.y")

		let use_colour_or_img = this.animation.get_attribute_value_now("use_colour_or_img")

		let colour = this.animation.get_attribute_value_now("colour")
		let img = this.animation.get_attribute_value_now("img")

		if (offset_x != undefined) { this.offset.x = offset_x }
		if (offset_y != undefined) { this.offset.y = offset_y }

		if (use_colour_or_img != undefined) { this.use_colour_or_img = use_colour_or_img }

		if (colour != undefined) { this.colour = colour }

		if (img != undefined) { this.img = img }

		this.shape.get_animatable_attributes().forEach((attribute) => {
			let _ = this.animation.get_attribute_value_now(attribute)
			this.shape.set_animatable_attributes(attribute, _)
		})
	}
}

globalThis.rectangle = class rectangle {
	/**
	 * @param {Vector2} size the size of the rectangle in width and height
	 */
	constructor(size) {
		if (size === undefined) {
			size = new Vector2(1, 1)
		} else {
			this.size = size
		}
	}

	get_animatable_attributes() {
		return ["shape.size.x", "shape.size.y"]
	}
	set_animatable_attributes(key, value) {
		if (value === undefined) {
			return
		}

		if (key === "shape.size.x") {
			this.size.x = value
		}

		if (key === "shape.size.y") {
			this.size.y = value
		}
	}
}

globalThis.text_shape = class text_shape {
	/**
	 * @param {String} text the text that will be displayed
	 * @param {Number} size one of the dimension of the text
	 * @param {"height" | "width"} sizeType choses which dimension the is of
	 * @param {"left" | "right" | "center" | "start" | "end"} textAlign
	 * 
	 * you can not set height and width only one
	 */
	constructor(text, size, sizeType, textAlign = "start") {
		this.text = text
		this.textAlign = textAlign
		if (sizeType === "height") {
			this.set_height(size)
		} else if (sizeType === "width") {
			this.set_width(size)
		} else {
			this.set_height(0.5)
		}
	}
	set_height(value) {
		console.log("height")
		this.size = "height"
		this.height = value
	}
	set_width(value) {
		console.log("width")
		this.size = "width"
		this.width = value
	}

	get_animatable_attributes() {
		return ["shape.text", "shape.textAlign", "shape.sizeType", "shape.size"]
	}
	set_animatable_attributes(key, value) {
		if (value === undefined) {
			return
		}

		if (key === "shape.text" && value.constructor === String) {
			this.text = value
		}

		if (key === "shape.textAlign" && value.constructor === String) {
			this.textAlign = value
		}

		if (key === "shape.sizeType" && value.constructor === String) {
			if (value === "height" || value === "width") {
				this.size = value
			}
		}

		if (key === "shape.size" && value.constructor === Number) {
			if (this.size == "width") {
				this.width = value
			} else {
				this.height = value
			}
		}
	}
}

globalThis.polygon = class polygon {
	/**
	 * @param {Array<Vector2>} points
	 * @param {boolean} fill
	 */
	constructor(points, fill = false) {
		this.points = points
		this.fill = fill
	}
}

globalThis.line = class line {
	/**
	 * @param {Vector2} vector
	 */
	constructor(vector) {
		this.vector = vector
	}
}

globalThis.colour_or_img = {
	colour: true,
	img: false
}

/**
 * @param {number} direction
 * @returns {number}
 */
globalThis.get_opposite_direction = (direction) => {
	switch (direction) {
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

/**
 * @param {number} direction
 * @returns {Vector2}
 */
globalThis.get_direction_as_Vector2 = (direction) => {
	switch (direction) {
		case directions.up:
			return new Vector2(0, -1)
		case directions.down:
			return new Vector2(0, 1)
		case directions.left:
			return new Vector2(-1, 0)
		case directions.right:
			return new Vector2(1, 0)
		default:
			throw new DirectionTypeError()
	}
}

globalThis.DirectionTypeError = class DirectionTypeError extends TypeError {
	constructor() {
		super()
		this.message = "Input is not a direction!"
	}
}

globalThis.Abstract_camera = class Abstract_camera extends base {
	timed_update(x) {
		if (this.draw_on_timed_update) {
			this.draw()
		}
	}
	/**
	 * @param {world} The_Container the Container this the object is in.
	 * @param {Vector2} New_location the location of the object.
	 * @param {HTMLCanvasElement} ctx the Canvas used for drawing.
	 * @param {Vector2} screen_size the size of the 'screen' or render area.
	 * @param {Boolean} draw_on_timed_update an option for auto drawing on timed_update.
	 */
	constructor(The_Container, New_location, ctx, draw_on_timed_update = false) {
		super(The_Container, New_location)

		this.ctx = ctx
		this.draw_on_timed_update = draw_on_timed_update
	}
}

globalThis.camera = class camera extends Abstract_camera {
	/**
	 * draws the world to the ctx
	 */
	draw() {

		var me = this

		var ctx = this.ctx //define stuff
		var ctx_context = ctx.getContext("2d")
		var xs = ctx.width
		var ys = ctx.height
		var b_size_y = ys / this.screen_size.y
		var b_size_x = xs / this.screen_size.x

		ctx_context.clearRect(0, 0, xs, ys)


		var draw_element = (A_render_component, thing) => {

			var x = thing.get_true_location().x
			var y = thing.get_true_location().y

			var my_x = me.get_true_location().x
			var my_y = me.get_true_location().y

			var offset_x = A_render_component.offset.x
			var offset_y = A_render_component.offset.y

			try {
				thing.before_draw()
			} catch (error) {
				console.error(error)
			}
			try {
				A_render_component.before_draw()
			} catch (error) {
				console.error(error)
			}
			switch (A_render_component.shape.constructor) {
				case rectangle:
					switch (A_render_component.use_colour_or_img) {
						case colour_or_img.img:
							ctx_context.drawImage(
								A_render_component.img,
								Math.round((x + offset_x - my_x) * b_size_x),
								Math.round((y + offset_y - my_y) * b_size_y),
								Math.round(b_size_x * A_render_component.shape.size.x),
								Math.round(b_size_y * A_render_component.shape.size.y))// display img
							break;
						case colour_or_img.colour:
							ctx_context.fillStyle = A_render_component.colour //select color
							ctx_context.fillRect(
								Math.round((x + offset_x - my_x) * b_size_x),
								Math.round((y + offset_y - my_y) * b_size_y),
								/*x * b_size_x - (my_x * b_size_x),
								y * b_size_y - (my_y * b_size_y),*/
								Math.round(b_size_x * A_render_component.shape.size.x),
								Math.round(b_size_y * A_render_component.shape.size.y)) //fill color
							break;
						default:
							console.log(`Invalid use_colour_or_img on`)
							console.log(A_render_component)
							break;
					}
					break;
				case text_shape:
					ctx_context.fillStyle = A_render_component.colour //select color
					if (A_render_component.shape.size === "height") {
						ctx_context.font = `${(b_size_y * A_render_component.shape.height * 1.4) - 1}px monospace`
					}
					if (A_render_component.shape.size === "width") {
						ctx_context.font = `${b_size_x * ((A_render_component.shape.width / A_render_component.shape.text.length) * 1.70)}px monospace`
					}
					ctx_context.textAlign = A_render_component.shape.textAlign
					ctx_context.fillText(
						A_render_component.shape.text,
						Math.round((x + offset_x - my_x) * b_size_x),
						Math.round(
							(y + offset_y - my_y) * b_size_y),
					)
					break
				case line:
					ctx_context.fillStyle = A_render_component.colour //select color
					ctx_context.beginPath()
					ctx_context.moveTo(
						Math.round((x + offset_x - my_x) * b_size_x),
						Math.round((y + offset_y - my_y) * b_size_y)
					)
					ctx_context.lineTo(
						Math.round((x + offset_x - my_x + A_render_component.shape.vector.x) * b_size_x),
						Math.round((y + offset_y - my_y + A_render_component.shape.vector.y) * b_size_y)
					)
					ctx_context.closePath();
					ctx_context.stroke();
					break;
				case polygon:
					ctx_context.fillStyle = A_render_component.colour //select color
					ctx_context.beginPath()
					ctx_context.moveTo(
						Math.round((x + offset_x - my_x) * b_size_x),
						Math.round((y + offset_y - my_y) * b_size_y)
					)
					for (let i = 0; i < A_render_component.shape.points.length; i++) {
						ctx_context.lineTo(
							Math.round((x + offset_x - my_x + A_render_component.shape.points[i].x) * b_size_x),
							Math.round((y + offset_y - my_y + A_render_component.shape.points[i].y) * b_size_y)
						)
					}
					if (A_render_component.shape.fill) {
						ctx_context.fill();
					} else {
						ctx_context.closePath();
						ctx_context.stroke();
					}
					break
				default:
					console.log(`Invalid shape on`)
					console.log(A_render_component)
					break;
			}

		}

		this.Containing_World.All_objects.forEach((element) => {
			if (element.visible !== undefined) {
				element.visible.forEach((A_render_component) => {
					draw_element(A_render_component, element)
				})
			}
		})
	}
	/**
	 * @param {world} The_Container the Container this the object is in.
	 * @param {Vector2} New_location the location of the object.
	 * @param {HTMLCanvasElement} ctx the Canvas used for drawing.
	 * @param {Vector2} screen_size the size of the 'screen' or render area.
	 * @param {Boolean} draw_on_timed_update an option for auto drawing on timed_update.
	 */
	constructor(The_Container, New_location, ctx, screen_size, draw_on_timed_update = false) {
		super(The_Container, New_location, ctx, draw_on_timed_update)

		this.screen_size = screen_size
	}
}

/**
 * @param {Vector2} location the location to check.
 * @param {world} The_world the world to check in.
 * @param {Object} self_ the function will not included this in the output
 * @returns {Boolean}
 * true is valid and false is invalid
 */
globalThis.check = (location, The_world, self_) => {
	is = true
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
globalThis.check_out_of_world = (location, The_world) => {
	if (The_world.size === undefined) {
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

/**
 * @param {Vector2} location the location to check.
 * @param {world} The_world the world to check in.
 * @param {Object} self_ the function will not included this in the output
 * @returns {Boolean}
 * true is valid and false is invalid
 * only checks if the location is occupied by a solid object
 */
globalThis.check_is_in_solid = (location, The_world, self_) => {
	is_in_solid = false
	The_world.get_at_location(location, self_).forEach((Thing) => {
		if (Thing.physics != undefined) {
			is_in_solid = Thing.physics.solid || is_in_solid
		}
	})
	return !is_in_solid
}

/**
 * @enum {Number}
 */
globalThis.directions = {
	up: 1,
	right: 2,
	down: 3,
	left: 4,
}

// Checks if running in node or web browser
try {
	exports.test = "test"
	console.log("NodeJS")
} catch (error) {
	console.log("Web Browser")
}