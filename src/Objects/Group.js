import { Base } from "./Base"

class Group extends Base {
	constructor(The_Container, New_location) {
		super(The_Container, New_location)
		this.objects = new Set()
	}
	add(object) {
		if (object.Containing_World !== this.Containing_World) {
			throw new Error("can not add a object from a different world")
		}
		this.objects.add(object)
		object.Parent_Container = this
	}
	get All_objects() {
		var _ = new Set()
		this.objects.forEach((element, index) => {
			try {
				_ = new Set([..._, ...element.All_objects])
			} catch (e) { }
			_.add(element)
		})
		return _
	}
}

export { Group }