(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('uuid')) :
	typeof define === 'function' && define.amd ? define(['exports', 'uuid'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Player_Management = {}, global.uuid));
}(this, (function (exports, uuid) { 'use strict';

	class Player_Interface {
		/**
		 * @param {{query: {name: String}}} req
		 * @param {Player_API} my_Player_API
		 */
		constructor(req, my_Player_API) {
			this.my_Player_API = my_Player_API;
			this.uuid = uuid.v4(Math.random());
			if (my_Player_API.Check_Name(req.query.name)) {
				this.Change_Name(req.query.name);
			}
		}
		/**
		 * @returns {{uuid: String, name: String}}
		 */
		toJSON() {
			return { uuid: this.uuid, name: this.name }
		}
		/**
		 * not used for this 'base' version of the Player_interface 
		 */
		destroy() {

		}
		/**
		 * @param {Object} data
		 */
		change(data) {
			if (this.my_Player_API.check_name(data.name)) {
				this.Change_Name(data.name);
			} else {
				return false
			}
			return true
			// Players can not change there uuids
		}
		Change_Name(name) {
			this.name = name;
		}
		Get_Console_Name() {
			let output = this.uuid;
			if (this.name != undefined) {
				output += ` (${this.name})`;
			}
			return output
		}
	}

	class Player_Server {
		/**
		 * @param {String} uuid
		 * @returns {Player_interface}
		 */
		Get_Player_By_uuid(uuid) {
			var output = undefined;
			this.Players.forEach((the_Player) => {
				if (the_Player.uuid == uuid) {
					output = the_Player;
				}
			});
			return output
		}
		Pre_Check(req) {
			if (req.query.name != undefined) {
				if (this.Check_Name(req.query.name)) {
					return true
				} else {
					return { error: "name" }
				}
			}
			return true
		}
		Check_Name(name) {
			if (name == undefined) {
				return false
			}
			if (name.constructor != String) {
				return false
			}
			if (name.match(/^ *$/) !== null) {
				return false
			}
			for (let i = 0; i < this.Players.length; i++) {
				if (this.Players[i].name == name) {
					return false
				}
			}
			return true
		}
		/**
		 * @param {Object} app
		 * @param {String} base_url
		 * @param {Player_interface} the_player_interface
		 */
		constructor(app, base_url, the_player_interface) {
			this.Players = [];
			var me = this;

			app.post(base_url, (req, res) => {
				let the_check = this.Pre_Check(req);
				if (the_check == true) {
					var the_Player = new the_player_interface(req, me);
					this.Players.push(the_Player);
					console.log(`Add ${the_Player.Get_Console_Name()}`);
					res.statusCode = 201;
					res.json(the_Player.toJSON());
				} else {
					res.statusCode = 400;
					res.json(the_check);
					return
				}
			});

			app.get(base_url, (req, res) => {
				res.statusCode = 403;
				res.end();
			});

			app.get(`${base_url}:UUID`, (req, res) => {
				res.json((this.Get_Player_By_uuid(req.params.UUID)).toJSON());
			});

			app.post(`${base_url}:UUID`, (req, res) => {
				let the_player = this.Get_Player_By_uuid(req.params.UUID);
				if (the_player.change(req.query)) {
					res.statusCode = 200;
					console.log(`changed ${the_player.Get_Console_Name()}`);
				} else {
					console.log("invalid change");
					res.statusCode = 400;
				}
			});

			app.delete(`${base_url}:UUID`, (req, res) => {
				for (var i = 0; i < this.Players.length; i++) {
					if (this.Players[i].uuid == req.params.UUID) {
						let the_player = this.Players[i];
						let console_name = the_player.Get_Console_Name();
						the_player.destroy();
						this.Players.splice(i, 1);
						res.json({ text: "success" });
						console.log(`Removed ${console_name}`);
						return
					}
				}
			});
		}
	}

	exports.Player_Interface = Player_Interface;
	exports.Player_Server = Player_Server;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
