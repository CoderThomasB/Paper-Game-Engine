
/**
 * @typedef {Array.<base_data>} base_response
 * 
 * @typedef {String} base_data
 * 
 */
class base_chat_client {
	/**
	 * @param {String} server
	 * @param {function(String):any} update_chat_callback
	 */
	constructor(server, update_chat_callback) {
		this.server = server
		this.update_chat_callback = update_chat_callback
	}
	/**
	 * @returns {void}
	 */
	update_chat() {
		var xhttp = new XMLHttpRequest()
		var me = this
		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
				me.update_chat_callback(JSON.parse(xhttp.responseText))
			}
		}
		xhttp.open("GET", this.server, true)
		xhttp.send()
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
	 * @returns {Boolean}
	 */
	check_input(data) {
		let is = data.constructor == String && data.match(/^ *$/) === null
		if (!is) {
			console.log(data)
		}
		return is
	}
	/**
	 * @param {base_data} data
	 * @returns {void}
	 */
	push_to_chat(data) {
		if (!this.check_input(data)) { throw Error("invalid input") }
		data = this.sanitise_input(data)
		var xhttp = new XMLHttpRequest()
		xhttp.open("Post", this.server + this.get_queryString(data), true)
		xhttp.send()
	}
	/**
	 * @param {base_data} data
	 * @returns {String}
	 */
	get_queryString(data) {
		return "?body=" + data
	}
}

/**
 * @typedef {Array.<sender_data>} sender_response
 * 
 * @typedef {{
 * body:String,
 * sender: String
 * }} sender_data
 * 
 */

/**
 * DO NOT USE. dose not protect against spoofing attacks
 */
class sender_chat_client extends base_chat_client {
	/**
	 * @param {sender_data} data
	 * @returns {sender_data}
	 */
	sanitise_input(data) {
		return { sender: data.sender.toString(), body: data.body.toString() }
	}
	/**
	 * @param {sender_data} data
	 * @returns {Boolean}
	 */
	check_input(data) {
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
	 * @param {sender_data} data
	 * @returns {String}
	 */
	get_queryString(data) {
		return `?body=${data.body}&sender=${data.sender}`
	}
	/**
	 * @param {response_json} json_arry the json return from the server
	 * @returns {String}
	 */
	json_to_html(json_arry) {
		let html = ""
		for (let i = 0; i < json_arry.length; i++) {
			html += `<div class="message"><span class="sender">${json_arry[i].sender}</span>&#9;:&#9;<span class="body">${json_arry[i].body}</span><div>`
		}
		return html
	}
}

class Player_interface_chat_client extends sender_chat_client{
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
	check_input(data) {
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
	sanitise_input(data) {
		return { body: data.toString(), sender: this.Player_interface.uuid }
	}
}