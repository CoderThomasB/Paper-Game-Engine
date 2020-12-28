import { Basic_Chat } from "./Basic_Chat"
import "../JsDoc/Sender_Chat"

class Sender_Chat_JSON extends Basic_Chat {
	/**
	 * @param {Object} app
	 * @param {String} base_url
	 */
	Create_Server(app, base_url) {
		var me = this
		app.post(base_url, (req, res) => {
			me.push(req.query)
		})
		app.get(base_url, (req, res) => {
			res.send(me.Data_To_Send())
		})
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
				this.Format_Data(this.chat_Data[i])
			)
		}
		return JSON.stringify(return_data)
	}
	/**
	 * @param {Sender_Data} data
	 * @returns {String}
	 */
	Format_Data(data) {
		return data
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
		}
		return is
	}
	/**
	 * @param {Sender_Data} data
	 * @returns {Sender_Data}
	 */
	Sanitise_Input(data) {
		return { sender: data.sender.toString(), body: data.body.toString() }
	}
}

export { Sender_Chat_JSON }