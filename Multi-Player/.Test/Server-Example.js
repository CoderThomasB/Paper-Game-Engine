// This Use NodeJS
var Server = require("../Server.js")
var app = express()

var port = 27635

The_world = new world()
new physics(The_world, new location2D(1, 1))
new cameraLink(The_world, new location2D(0, 0), new location2D(10, 10), app, "/main_camera/")

new DataLink_component(app, "/DataLink_Test/", ["HP is 'Wow'"])
new AcshonLink_component(app, "/AcshonLink_Test", (req) => {
	console.log("Wow")
	return {State:"Ok"}
})

console.log(The_world)

function Test(){
	The_world.grid[0].location.x += 0.02
	if(The_world.grid[0].location.x > 9){
		The_world.grid[0].location.x = 0
	}
}

setInterval(Test, 10)

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`)
})