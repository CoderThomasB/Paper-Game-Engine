import { Sender_Chat_JSON } from "./Sender_Chat_JSON"
import "../JsDoc/Sender_Chat"
import * as uuid from "uuid"

class Player_Chat extends Sender_Chat_JSON {
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
	 * @param {Sender_Data} data
	 * @returns {Boolean}
	 */
	Check_Data(data) {
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
	 * @param {Sender_Data} data
	 * @returns {String}
	 */
	Format_Data(data) {
		let formatted_json = { body: data.body }


		let Player = this.the_Player_API.Get_Player_By_uuid(data.sender)
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

export { Player_Chat }