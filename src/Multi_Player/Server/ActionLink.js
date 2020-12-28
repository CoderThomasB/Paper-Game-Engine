import { DirectionTypeError } from "../../Math/Directions"

class ActionLink {
	constructor(app, _URL, Action) {

		this.app = app
		this._URL = _URL
		this.Action = Action
		this.Access_Control_Allow_Origin = "*"

		var me = this

		app.post(_URL, (req, res) => {
			try {
				res.json(me.Action(req.query, me))
			} catch (e) {
				if (e.constructor = DirectionTypeError) {
					console.log("input is not a direction")
				}
			}
		})
	}

}

export { ActionLink }