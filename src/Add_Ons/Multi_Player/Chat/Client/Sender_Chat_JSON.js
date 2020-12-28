import "../JsDoc/Sender_Chat"
import { Basic_Chat } from "./Basic_Chat"

/**
 * DO NOT USE. dose not protect against spoofing attacks
 */
class Sender_Chat_JSON extends Basic_Chat {
	/**
	 * @param {Sender_Data} data
	 * @returns {Sender_Data}
	 */
	Sanitise_Input(data) {
		return { sender: data.sender.toString(), body: data.body.toString() }
	}
	/**
	 * @param {Sender_Data} data
	 * @returns {Boolean}
	 */
	Check_Input(data) {
		let is = true
		is = data.sender != undefined && is
		is = data.body != undefined && is
		if (is) {
			is = data.sender.constructor == String && is
			is = data.body.constructor == String && is
			if (is) {
				is = data.body.match(/^ *$/) === null && is
				is = data.sender.match(/^ *$/) === null && is
			}
		}
		if (!is) {
			console.log(data)
		}
		return is
	}
	/**
	 * @param {Sender_Data} data
	 * @returns {String}
	 */
	Get_QueryString(data) {
		return `?body=${data.body}&sender=${data.sender}`
	}
	/**
	 * @param {response_json} json_arry the json return from the server
	 * @returns {String}
	 */
	Json_To_Html(json_arry) {
		let html = ""
		for (let i = 0; i < json_arry.length; i++) {
			html += `<div class="message"><span class="sender">${json_arry[i].sender}</span>&#9;:&#9;<span class="body">${json_arry[i].body}</span><div>`
		}
		return html
	}
}

export { Sender_Chat_JSON }