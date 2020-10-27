const e = require("express")
var _uuid = require("uuid")

globalThis.Player_interface = class Player_interface {
	/**
	 * @param {{query: {name: String}}} req
	 * @param {Player_API} my_Player_API
	 */
	constructor(req, my_Player_API) {
		this.my_Player_API = my_Player_API
		this.uuid = _uuid.v4(Math.random())
		if (my_Player_API.check_name(req.query.name)) {
			this.name = req.query.name
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
			this.name = data.name
		} else {
			return false
		}
		return true
		// Players can not change there uuids
	}
	get_console_name(){
		let output = this.uuid
		if(this.name != undefined){
			output += ` (${this.name})`
		}
		return output
	}
}

globalThis.Player_API = class Player_API {
	/**
	 * @param {String} uuid
	 * @returns {Player_interface}
	 */
	get_player_by_uuid(uuid) {
		var output = undefined
		this.Players.forEach((the_Player) => {
			if (the_Player.uuid == uuid) {
				output = the_Player
			}
		})
		return output
	}
	pre_check(req) {
		if (req.query.name != undefined) {
			if (this.check_name(req.query.name)) {
				return true
			} else {
				return {error: "name"}
			}
		}
		return true
	}
	check_name(name) {
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
		this.Players = []
		var me = this

		app.post(base_url, (req, res) => {
			let the_check = this.pre_check(req)
			if (the_check == true) {
				var the_Player = new the_player_interface(req, me)
				this.Players.push(the_Player)
				console.log(`Add ${the_Player.get_console_name()}`)
				res.statusCode = 201
				res.json(the_Player.toJSON())
			} else {
				res.statusCode = 400
				res.json(the_check)
				return
			}
		})

		app.get(base_url, (req, res) => {
			res.statusCode = 403
			res.end()
		})

		app.get(`${base_url}:UUID`, (req, res) => {
			res.json((this.get_player_by_uuid(req.params.UUID)).toJSON())
		})

		app.post(`${base_url}:UUID`, (req, res) => {
			let the_player = this.get_player_by_uuid(req.params.UUID)
			if (the_player.change(req.query)) {
				res.statusCode = 200
				console.log(`changed ${the_player.get_console_name()}`)
			} else {
				console.log("invalid change")
				res.statusCode = 400
			}
		})

		app.delete(`${base_url}:UUID`, (req, res) => {
			for (var i = 0; i < this.Players.length; i++) {
				if (this.Players[i].uuid == req.params.UUID) {
					let the_player = this.Players[i]
					let console_name = the_player.get_console_name()
					the_player.destroy()
					this.Players.splice(i, 1)
					res.json({ text: "success" })
					console.log(`Removed ${console_name}`)
					return
				}
			}
		})
	}
}
