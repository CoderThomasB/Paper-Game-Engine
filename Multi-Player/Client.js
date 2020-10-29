
const colour_or_img = {
	colour: true,
	img: false
}

class client_ActionLink {
	constructor(server){
		this.server = server
	}
	do(Data){
		var xhttp = new XMLHttpRequest()
		var queryString = "?" + (Object.keys(Data).map(key => key + '=' + Data[key]).join('&'))
		xhttp.open("POST", this.server + queryString, true)
		xhttp.send()
	}
}

class client_camera {
	constructor(ctx, server) {
		this.ctx = ctx
		this.server = server
	}
	Render(data) {
		var me = this
		var draw_data = data.draw_data

		var ctx = this.ctx //define stuff
		var ctx_context = ctx.getContext("2d")
		var xs = ctx.width
		var ys = ctx.height
		var b_size_y = ys / data.screen_size[0]
		var b_size_x = xs / data.screen_size[1]

		ctx_context.clearRect(0, 0, xs, ys)

		//console.log(data)
		draw_data.forEach(element => {
			switch (element.shape_type) {
				case "rectangle":
					switch (element.use_colour_or_img) {
						case colour_or_img.img:
							ctx_context.drawImage(
								A_render_component.img,
								Math.round(element.location[0] * b_size_x),
								Math.round(element.location[1] * b_size_y),
								Math.round(element.shape_data.size[0] * b_size_x),
								Math.round(element.shape_data.size[1] * b_size_y))// display img
							break;
						case colour_or_img.colour:
							ctx_context.fillStyle = element.colour //select color
							ctx_context.fillRect(
								Math.round(element.location[0] * b_size_x),
								Math.round(element.location[1] * b_size_y),
								Math.round(element.shape_data.size[0] * b_size_x),
								Math.round(element.shape_data.size[1] * b_size_y)) //fill color
							break;
						default:
							console.log(`Invalid use_colour_or_img :`)
							console.log(element.use_colour_or_img)
							break;
					}
					break;
				case "text_shape":
					ctx_context.fillStyle = element.colour
					ctx_context.textAlign = element.shape_data.textAlign
					if (element.shape_data.size == "height") {
						ctx_context.font = `${(b_size_y * element.shape_data.height * 1.4) - 1}px monospace`
					}
					if (element.shape_data.size == "width") {
						ctx_context.font = `${b_size_x * ((element.shape_data.width / element.shape_data.text.length) * 1.70)}px monospace`
					}
					ctx_context.fillText(
						element.shape_data.text,
						Math.round(element.location[0] * b_size_x),
						Math.round(element.location[1] * b_size_y),
					)
					break
				default:
					console.log(`Invalid shape :`)
					console.log(element.shape_type)
					break;
			}

		});
	}
	draw() {
		if (this.ready == false) {
			//console.log("not ready")
			return;
		}

		this.ready_rest = setTimeout(() => { me.ready = true }, 1000)
		this.ready = false


		let me = this
		var xhttp = new XMLHttpRequest()
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				me.ready = true
				//console.log(me.ready_rest)
				clearTimeout(me.ready_rest)
				me.Render(JSON.parse(this.responseText))
			}
		}
		xhttp.open("GET", this.server + "draw_data/", true)
		xhttp.send()
	}
}