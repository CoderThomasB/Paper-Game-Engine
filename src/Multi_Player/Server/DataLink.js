class DataLink {
	constructor(app, base_URL, data_to_send) {

		this.data_to_send = data_to_send
		this.app = app
		this.base_URL = base_URL

		var me = this

		app.get(base_URL, (req, res) => {
			console.log(me)
			res.json(me.data_to_send())
		})
	}

}

export { DataLink }