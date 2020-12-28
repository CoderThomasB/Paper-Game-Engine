import { Colour_Or_Img } from "../../Enums"

class CameraLink {
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
				case "Rectangle":
					switch (element.use_colour_or_img) {
						case Colour_Or_Img.img:
							ctx_context.drawImage(
								A_render_component.img,
								Math.round(element.location[0] * b_size_x),
								Math.round(element.location[1] * b_size_y),
								Math.round(element.shape_data.size[0] * b_size_x),
								Math.round(element.shape_data.size[1] * b_size_y))// display img
							break;
						case Colour_Or_Img.colour:
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
				case "Text_Shape":
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
				case "Line":
					ctx_context.fillStyle = element.colour
					ctx_context.beginPath()
					ctx_context.moveTo(
						Math.round(element.location[0] * b_size_x),
						Math.round(element.location[1] * b_size_y)
					)
					ctx_context.lineTo(
						Math.round(element.shape_data.vector[0] * b_size_x),
						Math.round(element.shape_data.vector[1] * b_size_y)
					)
					break
				case "Polygon":
					ctx_context.fillStyle = element.colour
					ctx_context.beginPath()
					ctx_context.moveTo(
						Math.round(element.location[0] * b_size_x),
						Math.round(element.location[1] * b_size_y)
					)
					for (let i = 0; i < element.shape_data.points.length; i++) {
						ctx_context.lineTo(
							Math.round(element.shape_data.points[i][0] * b_size_x),
							Math.round(element.shape_data.points[i][1] * b_size_y)
						)
					}
					if (element.shape_data.fill) {
						ctx_context.fill();
					} else {
						ctx_context.closePath();
						ctx_context.stroke();
					}
					break
				default:
					console.log(`Invalid shape : ${element.shape_type}`)
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

export { CameraLink }