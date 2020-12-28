import { Vector2 } from "../Math/Vector2"
import { Rectangle } from "../Shapes/Rectangle"
import { Render_Component } from "../Components/Render_Component"

class Base_Practical {
	/**
	 * @param {Render_Component[]} visible_list 
	 * @param {practical_emitter} Practical_Manager
	 */
	constructor(visible_list, Practical_Manager) {
		this.Velocity = new Vector2() // meshed in units per second

		this.Max_Existence_Time = 4000
		this.Practical_Manager = Practical_Manager
		this.Attached_Visible_List = visible_list
		this.Attached_Render_Component = new Render_Component(new Rectangle(new Vector2(0.1, 0.1)), "black")
		this.Visible_List_Number = this.Attached_Visible_List.push(this.Attached_Render_Component)
		this.Attached_Render_Component.before_draw = () => {
			this.before_draw()
		}
		this.Last_Time = Date.now()
		this.Start_Time = this.Last_Time
	}
	Get_Delta_Time() {
		if (this.Last_Time !== undefined) {
			let delta_time = Date.now() - this.Last_Time
			this.Last_Time = Date.now()
			return delta_time
		} else {
			this.Last_Time = Date.now()
			return 0
		}
	}
	before_draw() {
		let delta_time = this.Get_Delta_Time() / 1000
		this.Attached_Render_Component.offset.add(this.Velocity.clone().multiplyScalar(delta_time))

		if (Date.now() - this.Start_Time > this.Max_Existence_Time) {
			this.destroy()
		}

	}
	Check_And_Repair_Visible_List_Number() {
		if (this.Attached_Visible_List[this.Visible_List_Number] === this.Attached_Render_Component) {
			return true
		} else {
			for (let i = 0; i < this.Attached_Visible_List.length; i++) {
				if (this.Attached_Visible_List[i] === this.Attached_Render_Component) {
					this.Visible_List_Number = i
				}
			}
		}
	}
	Remove_From_Practicals_List() {
		this.Practical_Manager.practicals.delete(this)
	}
	Remove_Frome_Visible_List() {
		this.Check_And_Repair_Visible_List_Number()
		this.Attached_Visible_List.splice(this.Visible_List_Number, 1)
	}
	destroy() {
		this.Remove_From_Practicals_List()
		this.Remove_Frome_Visible_List()
	}
}

export { Base_Practical }