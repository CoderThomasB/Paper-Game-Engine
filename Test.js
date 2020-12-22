require("./main")


function test_class(class_) {
	var The_world = new world()
	var Test = new class_(The_world, new Vector2())
	if (!The_world.objects.has(Test)) { throw new Error(`new ${class_.name} is not in world`) }
	Test.destroy()
	if (The_world.objects.has(Test)) { throw new Error(`${class_.name} has not been destroy`) }
}

function test_container(class_) {
	var The_world = new world()
	var c = new container(The_world, new Vector2())
	var o = new class_(c, new Vector2())

	if (The_world.objects.has(o)) { throw new Error(`${class_.name} is in the world not the container`) }
	if (!c.objects.has(o)) { throw new Error(`container dose not have ${class_.name}`) }
	if (!The_world.All_objects.has(o)) { throw new Error(`${class_.name} is not found by world.All_objects`) }
}

function test_advanced_container(class_) {
	var The_world = new world()
	var c1 = new container(The_world, new Vector2())
	var c2 = new container(c1, new Vector2())
	var o = new class_(c2, new Vector2())

	if (!c2.objects.has(o)) { throw new Error(`c2 dose not have ${class_.name}`) }
	if (!The_world.All_objects.has(o)) { throw new Error(`${class_.name} is not found by world.All_objects`) }
	if (c1.objects.has(o)) { throw new Error(`${class_.name} is in the c1 and c2`) }
	if (!c1.All_objects.has(o)) { throw new Error(`${class_.name} is not in the set of all in c1`) }
}

function test_location(class_) {
	var The_world = new world()
	var Test = new class_(The_world, new Vector2(1, 2))
	if (Test.location.x !== 1) { throw new Error(`location.x is not the same as installed`) }
	if (Test.location.y !== 2) { throw new Error(`location.y is not the same as installed`) }
}

function test_basic_physics() {
	var The_world = new world()
	var p2 = new basic_physics(The_world, new Vector2(5, 5))
	var p1 = new basic_physics(The_world, new Vector2(4, 4))

	if (p2.physics.solid !== true) { throw new Error(`basic_physics is solid by default`) }

	p1.move(directions.right)
	if (p1.location.x !== 5) { throw new Error(`moving right is not increasing location.x by 1`) }
	if (p1.location.y !== 4) { throw new Error(`moving right is changing location.y`) }

	p1.move(directions.down)
	if (p1.location.x !== 5) { throw new Error(`moving down is changing location.x`) }
	if (p1.location.y !== 4) { throw new Error(`moving down with colinton is changing location.y`) }
}

function test_directions() {
	if (get_direction_as_Vector2(directions.up).x !== 0) { throw new Error(`directions.up x value is not 0. it is ${get_direction_as_Vector2(directions.up).x}`) }
	if (get_direction_as_Vector2(directions.up).y !== -1) { throw new Error(`directions.up y value is not -1. it is ${get_direction_as_Vector2(directions.up).y}`) }

	if (get_direction_as_Vector2(directions.down).x !== 0) { throw new Error(`directions.down x value is not 0. it is ${get_direction_as_Vector2(directions.down).x}`) }
	if (get_direction_as_Vector2(directions.down).y !== 1) { throw new Error(`directions.down y value is not 1. it is ${get_direction_as_Vector2(directions.down).y}`) }

	if (get_direction_as_Vector2(directions.left).x !== -1) { throw new Error(`directions.left x value is not -1. it is ${get_direction_as_Vector2(directions.left).x}`) }
	if (get_direction_as_Vector2(directions.left).y !== 0) { throw new Error(`directions.left y value is not 0. it is ${get_direction_as_Vector2(directions.left).y}`) }

	if (get_direction_as_Vector2(directions.right).x !== 1) { throw new Error(`directions.right x value is not 1. it is ${get_direction_as_Vector2(directions.right).x}`) }
	if (get_direction_as_Vector2(directions.right).y !== 0) { throw new Error(`directions.right y value is not 0. it is ${get_direction_as_Vector2(directions.right).y}`) }
}

function test_all_types(The_function) {
	The_function(base)
	The_function(container)
	The_function(visible)
	The_function(basic_physics)
}

test_all_types(test_class)
test_all_types(test_container)
test_all_types(test_advanced_container)
test_all_types(test_location)

test_directions()
test_basic_physics()

console.log("Everything is fine")