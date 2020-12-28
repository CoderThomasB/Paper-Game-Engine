class Player_Server {
	/**
	 * @param {String} uuid
	 * @returns {Player_interface}
	 */
	Get_Player_By_uuid(uuid) {
		var output = undefined
		this.Players.forEach((the_Player) => {
			if (the_Player.uuid == uuid) {
				output = the_Player
			}
		})
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
		this.Players = []
		var me = this

		app.post(base_url, (req, res) => {
			let the_check = this.Pre_Check(req)
			if (the_check == true) {
				var the_Player = new the_player_interface(req, me)
				this.Players.push(the_Player)
				console.log(`Add ${the_Player.Get_Console_Name()}`)
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
			res.json((this.Get_Player_By_uuid(req.params.UUID)).toJSON())
		})

		app.post(`${base_url}:UUID`, (req, res) => {
			let the_player = this.Get_Player_By_uuid(req.params.UUID)
			if (the_player.change(req.query)) {
				res.statusCode = 200
				console.log(`changed ${the_player.Get_Console_Name()}`)
			} else {
				console.log("invalid change")
				res.statusCode = 400
			}
		})

		app.delete(`${base_url}:UUID`, (req, res) => {
			for (var i = 0; i < this.Players.length; i++) {
				if (this.Players[i].uuid == req.params.UUID) {
					let the_player = this.Players[i]
					let console_name = the_player.Get_Console_Name()
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

export { Player_Server }