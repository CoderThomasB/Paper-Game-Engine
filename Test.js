const Paper = require("./Build/2D")

function test_class(class_) {
	var The_world = new Paper.World()
	var Test = new class_(The_world, new Paper.Vector2())
	if (!The_world.objects.has(Test)) { throw new Error(`new ${class_.name} is not in world`) }
	Test.destroy()
	if (The_world.objects.has(Test)) { throw new Error(`${class_.name} has not been destroy`) }
}

function test_Group(class_) {
	var The_world = new Paper.World()
	var c = new Paper.Group(The_world, new Paper.Vector2())
	var o = new class_(c, new Paper.Vector2())

	if (The_world.objects.has(o)) { throw new Error(`${class_.name} is in the world not the Group`) }
	if (!c.objects.has(o)) { throw new Error(`Group dose not have ${class_.name}`) }
	if (!The_world.All_objects.has(o)) { throw new Error(`${class_.name} is not found by world.All_objects`) }
}

function test_advanced_Group(class_) {
	var The_world = new Paper.World()
	var c1 = new Paper.Group(The_world, new Paper.Vector2())
	var c2 = new Paper.Group(c1, new Paper.Vector2())
	var o = new class_(c2, new Paper.Vector2())

	if (!c2.objects.has(o)) { throw new Error(`c2 dose not have ${class_.name}`) }
	if (!The_world.All_objects.has(o)) { throw new Error(`${class_.name} is not found by world.All_objects`) }
	if (c1.objects.has(o)) { throw new Error(`${class_.name} is in the c1 and c2`) }
	if (!c1.All_objects.has(o)) { throw new Error(`${class_.name} is not in the set of all in c1`) }
}

function test_location(class_) {
	var The_world = new Paper.World()
	var Test = new class_(The_world, new Paper.Vector2(1, 2))
	if (Test.location.x !== 1) { throw new Error(`location.x is not the same as installed`) }
	if (Test.location.y !== 2) { throw new Error(`location.y is not the same as installed`) }
}

function test_basic_physics() {
	var The_world = new Paper.World()
	var p2 = new Paper.Basic_Physics(The_world, new Paper.Vector2(5, 5))
	var p1 = new Paper.Basic_Physics(The_world, new Paper.Vector2(4, 4))

	if (p2.physics.solid !== true) { throw new Error(`basic_physics is solid by default`) }

	p1.move(Paper.Directions.Right)
	if (p1.location.x !== 5) { throw new Error(`moving right is not increasing location.x by 1`) }
	if (p1.location.y !== 4) { throw new Error(`moving right is changing location.y`) }

	p1.move(Paper.Directions.Down)
	if (p1.location.x !== 5) { throw new Error(`moving down is changing location.x`) }
	if (p1.location.y !== 4) { throw new Error(`moving down with colinton is changing location.y`) }
}

function test_Directions() {

	if (Paper.Get_Direction_As_Vector2(Paper.Directions.Up).x !== 0) { throw new Error(`Paper.Directions.up x value is not 0. it is ${Paper.Get_Direction_As_Vector2(Paper.Directions.up).x}`) }
	if (Paper.Get_Direction_As_Vector2(Paper.Directions.Up).y !== -1) { throw new Error(`Paper.Directions.up y value is not -1. it is ${Paper.Get_Direction_As_Vector2(Paper.Directions.up).y}`) }

	if (Paper.Get_Direction_As_Vector2(Paper.Directions.Down).x !== 0) { throw new Error(`Paper.Directions.down x value is not 0. it is ${Paper.Get_Direction_As_Vector2(Paper.Directions.down).x}`) }
	if (Paper.Get_Direction_As_Vector2(Paper.Directions.Down).y !== 1) { throw new Error(`Paper.Directions.down y value is not 1. it is ${Paper.Get_Direction_As_Vector2(Paper.Directions.down).y}`) }

	if (Paper.Get_Direction_As_Vector2(Paper.Directions.Left).x !== -1) { throw new Error(`Paper.Directions.left x value is not -1. it is ${Paper.Get_Direction_As_Vector2(Paper.Directions.left).x}`) }
	if (Paper.Get_Direction_As_Vector2(Paper.Directions.Left).y !== 0) { throw new Error(`Paper.Directions.left y value is not 0. it is ${Paper.Get_Direction_As_Vector2(Paper.Directions.left).y}`) }

	if (Paper.Get_Direction_As_Vector2(Paper.Directions.Right).x !== 1) { throw new Error(`Paper.Directions.right x value is not 1. it is ${Paper.Get_Direction_As_Vector2(Paper.Directions.right).x}`) }
	if (Paper.Get_Direction_As_Vector2(Paper.Directions.Right).y !== 0) { throw new Error(`Paper.Directions.right y value is not 0. it is ${Paper.Get_Direction_As_Vector2(Paper.Directions.right).y}`) }
}

function test_all_types(The_function) {
	The_function(Paper.Base)
	The_function(Paper.Group)
	The_function(Paper.Visible)
	The_function(Paper.Basic_Physics)
}

test_all_types(test_class)
test_all_types(test_Group)
test_all_types(test_advanced_Group)
test_all_types(test_location)

test_Directions()
test_basic_physics()

console.log("Everything is fine")