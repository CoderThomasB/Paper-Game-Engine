import { Keyframe_Types } from "../Enums"

class Animation {
	/**
	 * 
	 * @param {Array<Keyframe>} keyframes 
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
		if (closet_keyframe_behind.type === Keyframe_Types.snap) {
			return closet_keyframe_behind.value
		}
		if (closet_keyframe_behind.type === Keyframe_Types.liner) {
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

export { Animation }