import "../JsDoc/Basic_Chat"

class Basic_Chat {
	/**
	 * @param {Object} app
	 * @param {String} base_url
	 * @param {Number} max_chat_send_size
	 */
	constructor(app, base_url, max_chat_send_size) {
		this.chat_Data = []
		this.max_chat_send_size = max_chat_send_size
		this.Create_Server(app, base_url)
	}
	/**
	 * @param {Object} app
	 * @param {String} base_url
	 */
	Create_Server(app, base_url) {
		var me = this
		//this.push_ActionLink = new ActionLink_component(app, base_url, this.push)
		app.post(base_url, (req, res) => {
			me.push(req.query.body)
		})
		app.get(base_url, (req, res) => {
			res.send(me.Data_To_Send())
		})
	}
	/**
	 * @param {Basic_Data} data
	 */
	push(data) {
		if (this.Check_Data(data)) {
			this.chat_Data.push(this.Sanitise_Input(data))
		} else {
			console.log(data)
			throw Error("none valid data")
		}
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
	 * @returns {boolean}
	 */
	Check_Data(data) {
		return data.constructor == String && data.match(/^ *$/) === null
	}
	/**
	 * @returns {Number}
	 */
	Get_Starting_Send_Number() {
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
	Get_Ending_Send_Number() {
		return this.chat_Data.length
	}
	/**
	 * @returns {String}
	 */
	Data_To_Send() {
		let starting_number = this.Get_Starting_Send_Number()
		let ending_number = this.Get_Ending_Send_Number()
		let return_data = []
		for (let i = starting_number; i < ending_number; i++) {
			return_data.push(
				this.format_data(this.chat_Data[i])
			)
		}
		return JSON.stringify(return_data)
	}
}

export { Basic_Chat }