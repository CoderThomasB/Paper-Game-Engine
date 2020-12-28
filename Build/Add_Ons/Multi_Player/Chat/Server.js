(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('uuid')) :
	typeof define === 'function' && define.amd ? define(['exports', 'uuid'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Chat = {}, global.uuid));
}(this, (function (exports, uuid) { 'use strict';

	class Basic_Chat {
		/**
		 * @param {Object} app
		 * @param {String} base_url
		 * @param {Number} max_chat_send_size
		 */
		constructor(app, base_url, max_chat_send_size) {
			this.chat_Data = [];
			this.max_chat_send_size = max_chat_send_size;
			this.Create_Server(app, base_url);
		}
		/**
		 * @param {Object} app
		 * @param {String} base_url
		 */
		Create_Server(app, base_url) {
			var me = this;
			//this.push_ActionLink = new ActionLink_component(app, base_url, this.push)
			app.post(base_url, (req, res) => {
				me.push(req.query.body);
			});
			app.get(base_url, (req, res) => {
				res.send(me.Data_To_Send());
			});
		}
		/**
		 * @param {Basic_Data} data
		 */
		push(data) {
			if (this.Check_Data(data)) {
				this.chat_Data.push(this.Sanitise_Input(data));
			} else {
				console.log(data);
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
				let starting_number = this.chat_Data.length - this.max_chat_send_size;
				if (starting_number < 0) { starting_number = 0; }
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
			let starting_number = this.Get_Starting_Send_Number();
			let ending_number = this.Get_Ending_Send_Number();
			let return_data = [];
			for (let i = starting_number; i < ending_number; i++) {
				return_data.push(
					this.format_data(this.chat_Data[i])
				);
			}
			return JSON.stringify(return_data)
		}
	}

	class Sender_Chat_JSON extends Basic_Chat {
		/**
		 * @param {Object} app
		 * @param {String} base_url
		 */
		Create_Server(app, base_url) {
			var me = this;
			app.post(base_url, (req, res) => {
				me.push(req.query);
			});
			app.get(base_url, (req, res) => {
				res.send(me.Data_To_Send());
			});
		}
		/**
		 * @returns {String}
		 */
		Data_To_Send() {
			let starting_number = this.Get_Starting_Send_Number();
			let ending_number = this.Get_Ending_Send_Number();
			let return_data = [];
			for (let i = starting_number; i < ending_number; i++) {
				return_data.push(
					this.Format_Data(this.chat_Data[i])
				);
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
			let is = true;
			is = data.sender != undefined && is;
			is = data.body != undefined && is;
			if (is) {
				is = data.sender.constructor == String && is;
				is = data.body.constructor == String && is;
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

	class Player_Chat extends Sender_Chat_JSON {
		/**
		 * @param {Object} app
		 * @param {String} base_url
		 * @param {Number} max_chat_send_size
		 * @param {Player_API} the_Player_API
		 */
		constructor(app, base_url, the_Player_API, max_chat_send_size) {
			super(app, base_url, max_chat_send_size);
			this.the_Player_API = the_Player_API;
		}
		/**
		 * @param {Sender_Data} data
		 * @returns {Boolean}
		 */
		Check_Data(data) {
			let is = true;
			is = data.sender != undefined && is;
			is = data.body != undefined && is;
			if (is) {
				is = data.sender.constructor == String && is;
				is = data.body.constructor == String && is;
				if (is) {
					is = uuid.validate(data.sender) && is;
				}
			}
			return is
		}
		/**
		 * @param {Sender_Data} data
		 * @returns {String}
		 */
		Format_Data(data) {
			let formatted_json = { body: data.body };


			let Player = this.the_Player_API.Get_Player_By_uuid(data.sender);
			if (Player != undefined) {
				if (Player.name != undefined) {
					if (Player.name.constructor == String) {
						formatted_json.sender = Player.name;
						return formatted_json
					}
				}
			}

			formatted_json.sender = "No Name";
			return formatted_json

		}
	}

	exports.Basic_Chat = Basic_Chat;
	exports.Player_Chat = Player_Chat;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
