var server = require("../../Server")
var uuid = require("uuid")

/**
 * @typedef {Array.<base_data>} base_chat_data
 * 
 * @typedef {String} base_data
 * 
 */
globalThis.base_chat_API = class base_chat_API {
	/**
	 * @param {Object} app
	 * @param {String} base_url
	 * @param {Number} max_chat_send_size
	 */
	constructor(app, base_url, max_chat_send_size) {
		this.chat_Data = []
		this.max_chat_send_size = max_chat_send_size
		this.create_Server(app, base_url)
	}
	/**
	 * @param {Object} app
	 * @param {String} base_url
	 */
	create_Server(app, base_url) {
		var me = this
		//this.push_ActionLink = new ActionLink_component(app, base_url, this.push)
		app.post(base_url, (req, res) => {
			me.push(req.query.body)
		})
		app.get(base_url, (req, res) => {
			res.send(me.data_to_send())
		})
	}
	/**
	 * @param {base_data} data
	 */
	push(data) {
		if (this.check_data(data)) {
			this.chat_Data.push(this.sanitise_input(data))
		} else {
			console.log(data)
			throw Error("none valid data")
		}
	}
	/**
	 * @param {base_data} data
	 * @returns {base_data}
	 */
	sanitise_input(data) {
		return data.toString()
	}
	/**
	 * @param {base_data} data
	 * @returns {boolean}
	 */
	check_data(data) {
		return data.constructor == String && data.match(/^ *$/) === null
	}
	/**
	 * @returns {Number}
	 */
	get_starting_send_number() {
		if (this.max_chat_send_size > 0) {
			let starting_number = this.chat_Data.length - this.max_chat_send_size
			if (starting_number < 0) { starting_number = 0 }
			return starting_number
		} else {
			return 0
		}
	}
	/**
	 * @returns {Number}
	 */
	get_ending_send_number() {
		return this.chat_Data.length
	}
	/**
	 * @returns {String}
	 */
	data_to_send() {
		let starting_number = this.get_starting_send_number()
		let ending_number = this.get_ending_send_number()
		let return_data = []
		for (let i = starting_number; i < ending_number; i++) {
			return_data.push(
				this.format_data(this.chat_Data[i])
			)
		}
		return JSON.stringify(return_data)
	}
}

/**
 * DO NOT USE. dose not protect against spoofing attacks
 * 
 * @typedef {Array.<sender_data>} sender_chat_data
 * 
 * @typedef {body:String, sender: String} sender_data
 * 
 */
globalThis.sender_chat_API_JSON = class sender_chat_API_JSON extends base_chat_API {
	/**
	 * @param {Object} app
	 * @param {String} base_url
	 */
	create_Server(app, base_url) {
		var me = this
		app.post(base_url, (req, res) => {
			me.push(req.query)
		})
		app.get(base_url, (req, res) => {
			res.send(me.data_to_send())
		})
	}
	/**
	 * @returns {String}
	 */
	data_to_send() {
		let starting_number = this.get_starting_send_number()
		let ending_number = this.get_ending_send_number()
		let return_data = []
		for (let i = starting_number; i < ending_number; i++) {
			return_data.push(
				this.format_data(this.chat_Data[i])
			)
		}
		return JSON.stringify(return_data)
	}
	/**
	 * @param {sender_data} data
	 * @returns {String}
	 */
	format_data(data) {
		return data
	}
	/**
	 * @param {sender_data} data
	 * @returns {Boolean}
	 */
	check_data(data) {
		let is = true
		is = data.sender != undefined && is
		is = data.body != undefined && is
		if (is) {
			is = data.sender.constructor == String && is
			is = data.body.constructor == String && is
		}
		return is
	}
	/**
	 * @param {sender_data} data
	 * @returns {sender_data}
	 */
	sanitise_input(data) {
		return { sender: data.sender.toString(), body: data.body.toString() }
	}
}

globalThis.Player_Management_chat = class Player_Management_chat extends sender_chat_API_JSON {
	/**
	 * @param {Object} app
	 * @param {String} base_url
	 * @param {Number} max_chat_send_size
	 * @param {Player_API} the_Player_API
	 */
	constructor(app, base_url, the_Player_API, max_chat_send_size) {
		super(app, base_url, max_chat_send_size)
		this.the_Player_API = the_Player_API
	}
	/**
	 * @param {sender_data} data
	 * @returns {Boolean}
	 */
	check_data(data) {
		let is = true
		is = data.sender != undefined && is
		is = data.body != undefined && is
		if (is) {
			is = data.sender.constructor == String && is
			is = data.body.constructor == String && is
			if (is) {
				is = uuid.validate(data.sender) && is
			}
		}
		return is
	}
	/**
	 * @param {sender_data} data
	 * @returns {String}
	 */
	format_data(data) {
		let formatted_json = { body: data.body }


		let Player = this.the_Player_API.get_player_by_uuid(data.sender)
		if (Player != undefined) {
			if (Player.name != undefined) {
				if (Player.name.constructor == String) {
					formatted_json.sender = Player.name
					return formatted_json
				}
			}
		}

		formatted_json.sender = "No Name"
		return formatted_json

	}
}