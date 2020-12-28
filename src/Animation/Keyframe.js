import { Keyframe_Types } from "../Enums"

class Keyframe {
	/**
	 * 
	 * @param {Number} time 
	 * @param {String} attribute 
	 * @param {Any} value 
	 */
	constructor(time, attribute, value, type = Keyframe_Types.snap) {
		if (type === Keyframe_Types.liner) {
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

export { Keyframe }