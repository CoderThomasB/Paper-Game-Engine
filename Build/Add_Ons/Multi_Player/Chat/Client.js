(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Chat = {}));
}(this, (function (exports) { 'use strict';

	class Basic_Chat {
		/**
		 * @param {String} server
		 * @param {function(String):any} update_chat_callback
		 */
		constructor(server, update_chat_callback) {
			this.server = server;
			this.update_chat_callback = update_chat_callback;
		}
		/**
		 * @returns {void}
		 */
		Update_Chat() {
			var xhttp = new XMLHttpRequest();
			var me = this;
			xhttp.onreadystatechange = () => {
				if (xhttp.readyState == 4 && xhttp.status == 200) {
					me.update_chat_callback(JSON.parse(xhttp.responseText));
				}
			};
			xhttp.open("GET", this.server, true);
			xhttp.send();
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
			let is = data.constructor == String && data.match(/^ *$/) === null;
			if (!is) {
				console.log(data);
			}
			return is
		}
		/**
		 * @param {Basic_Data} data
		 * @returns {void}
		 */
		Push_To_Chat(data) {
			if (!this.Check_Input(data)) { throw Error("invalid input") }
			data = this.Sanitise_Input(data);
			var xhttp = new XMLHttpRequest();
			xhttp.open("Post", this.server + this.Get_QueryString(data), true);
			xhttp.send();
		}
		/**
		 * @param {Basic_Data} data
		 * @returns {String}
		 */
		Get_QueryString(data) {
			return "?body=" + data
		}
	}

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
			let is = true;
			is = data.sender != undefined && is;
			is = data.body != undefined && is;
			if (is) {
				is = data.sender.constructor == String && is;
				is = data.body.constructor == String && is;
				if (is) {
					is = data.body.match(/^ *$/) === null && is;
					is = data.sender.match(/^ *$/) === null && is;
				}
			}
			if (!is) {
				console.log(data);
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
			let html = "";
			for (let i = 0; i < json_arry.length; i++) {
				html += `<div class="message"><span class="sender">${json_arry[i].sender}</span>&#9;:&#9;<span class="body">${json_arry[i].body}</span><div>`;
			}
			return html
		}
	}

	class Player_Chat extends Sender_Chat_JSON{
		/**
		 * @param {String} server
		 * @param {function(String):any} update_chat_callback
		 */
		constructor(server, Player_interface, update_chat_callback){
			super(server, update_chat_callback);
			this.Player_interface = Player_interface;
		}
		/**
		 * @param {base_data} data
		 * @returns {boolean}
		 */
		Check_Input(data) {
			let is = data.constructor == String && data.match(/^ *$/) === null;
			if(!is){
				console.log(data);
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

	exports.Basic_Chat = Basic_Chat;
	exports.Player_Chat = Player_Chat;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
