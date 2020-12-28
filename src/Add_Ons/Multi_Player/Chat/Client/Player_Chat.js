import { Sender_Chat_JSON } from "./Sender_Chat_JSON"

class Player_Chat extends Sender_Chat_JSON{
	/**
	 * @param {String} server
	 * @param {function(String):any} update_chat_callback
	 */
	constructor(server, Player_interface, update_chat_callback){
		super(server, update_chat_callback)
		this.Player_interface = Player_interface
	}
	/**
	 * @param {base_data} data
	 * @returns {boolean}
	 */
	Check_Input(data) {
		let is = data.constructor == String && data.match(/^ *$/) === null
		if(!is){
			console.log(data)
		}
		return is
	}
	/**
	 * @param {base_data} data
	 * @returns {base_data}
	 */
	Sanitise_Input(data) {
		return { body: data.toString(), sender: this.Player_interface.uuid }
	}
}

export {Player_Chat}