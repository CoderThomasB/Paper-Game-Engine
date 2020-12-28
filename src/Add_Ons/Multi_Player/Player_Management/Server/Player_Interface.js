import { v4 } from "uuid"

class Player_Interface {
	/**
	 * @param {{query: {name: String}}} req
	 * @param {Player_API} my_Player_API
	 */
	constructor(req, my_Player_API) {
		this.my_Player_API = my_Player_API
		this.uuid = v4(Math.random())
		if (my_Player_API.Check_Name(req.query.name)) {
			this.Change_Name(req.query.name)
		}
	}
	/**
	 * @returns {{uuid: String, name: String}}
	 */
	toJSON() {
		return { uuid: this.uuid, name: this.name }
	}
	/**
	 * not used for this 'base' version of the Player_interface 
	 */
	destroy() {

	}
	/**
	 * @param {Object} data
	 */
	change(data) {
		if (this.my_Player_API.check_name(data.name)) {
			this.Change_Name(data.name)
		} else {
			return false
		}
		return true
		// Players can not change there uuids
	}
	Change_Name(name) {
		this.name = name
	}
	Get_Console_Name() {
		let output = this.uuid
		if (this.name != undefined) {
			output += ` (${this.name})`
		}
		return output
	}
}

export { Player_Interface }