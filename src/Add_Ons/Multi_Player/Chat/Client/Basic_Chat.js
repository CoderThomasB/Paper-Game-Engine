import "../JsDoc/Basic_Chat"

class Basic_Chat {
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
	Update_Chat() {
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
	 * @param {Basic_Data} data
	 * @returns {Basic_Data}
	 */
	Sanitise_Input(data) {
		return data.toString()
	}
	/**
	 * @param {Basic_Data} data
	 * @returns {Boolean}
	 */
	Check_Input(data) {
		let is = data.constructor == String && data.match(/^ *$/) === null
		if (!is) {
			console.log(data)
		}
		return is
	}
	/**
	 * @param {Basic_Data} data
	 * @returns {void}
	 */
	Push_To_Chat(data) {
		if (!this.Check_Input(data)) { throw Error("invalid input") }
		data = this.Sanitise_Input(data)
		var xhttp = new XMLHttpRequest()
		xhttp.open("Post", this.server + this.Get_QueryString(data), true)
		xhttp.send()
	}
	/**
	 * @param {Basic_Data} data
	 * @returns {String}
	 */
	Get_QueryString(data) {
		return "?body=" + data
	}
}

export { Basic_Chat }