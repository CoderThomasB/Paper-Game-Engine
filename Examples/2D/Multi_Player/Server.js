const Paper = require("../../../Build/Multi_Player/2D/Server")
const Player_Management = require("../../../Build/Add_Ons/Multi_Player/Player_Management/Server")
const Chat = require("../../../Build/Add_Ons/Multi_Player/Chat/Server")
const express = require("express")
var cors = require('cors')
const { randomInt } = require("crypto")
var app = express()

app.use(cors())

var port = 27635

class player_object extends Paper.Basic_Physics {
	constructor(New_world, New_location, the_Player_interface) {
		super(New_world, New_location)
		this.Player_interface = the_Player_interface
	}
	update() {
		this.Player_interface.the_cameraLink.location = this.location.clone().add(new Paper.Vector2(-5, -5))
	}
}

class custom_Player_interface extends Player_Management.Player_Interface {
	constructor(req, my_Player_API) {
		super(req, my_Player_API)

		this.move_ActionLink = new Paper.ActionLink(app, this.get_move_ActionLink_url(), this.move_Action)
		this.move_ActionLink.parent = this
		this.player_object = new player_object(the_world, new Paper.Vector2(5, 5), this)
		this.the_cameraLink = new Paper.CameraLink(the_world, new Paper.Vector2(0, 0), new Paper.Vector2(11, 11), app, this.get_camera_url())

		
		/*this.player_object.visible[1] = new render_component(new text_shape(this.name, 1.2, "width", "center"), "black")
		this.player_object.visible[1].offset.x = 0.5
		this.player_object.visible[1].offset.y = -0.1*/
		this.player_object.visible[1] = new Paper.Render_Component(new Paper.Text_Shape(this.name, 0.8, "width", "center"), "black")
		this.player_object.visible[1].offset.x = 0.5
		this.player_object.visible[1].offset.y = 0.5
		this.player_object.visible[0].colour = `rgb(${randomInt(255)},${randomInt(255)},${randomInt(255)})`
		this.player_object.location.x = randomInt(4) + 1
		this.player_object.location.y = randomInt(4) + 1

		the_world.update()
	}
	change_name(name) {
		this.name = name
		try{
			this.player_object.visible[1].shape.text = name
		} catch(e){

		}
	}
	move_Action(query, the_ActionLink) {
		the_ActionLink.parent.player_object.move(
			parseInt(query.direction)
		)
	}
	get_move_ActionLink_url() {
		return `/Players/${this.uuid}/move/`
	}
	get_camera_url() {
		return `/Players/${this.uuid}/camera/`
	}
	toJSON() {
		return {
			uuid: this.uuid,
			name: this.name,
			camera_url: this.get_camera_url(),
			move_ActionLink_url: this.get_move_ActionLink_url()
		}
	}
	destroy() {
		this.player_object.destroy()
	}
}


the_world = new Paper.World()

span_area = new Paper.Visible(the_world, new Paper.Vector2(-1,-1))
span_area.visible[0].colour = "rgb(31 159 197)"
span_area.visible[0].shape.size.x = 8
span_area.visible[0].shape.size.y = 8


for (let x = -100; x < 101; x += 5) {
	for (let y = -100; y < 101; y += 5) {
		new Paper.Basic_Physics(the_world, new Paper.Vector2(x, y))
	}
}


the_Player_API = new Player_Management.Player_Server(app, "/Players/", custom_Player_interface)
the_chat = new Chat.Player_Chat(app, "/chat/", the_Player_API, 5)

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})