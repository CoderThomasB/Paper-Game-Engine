class Practical_Emitter {
	/**
	 * 
	 * @param {base_practical} practical_Type 
	 * @param {render_component[]} visible_list 
	 * @param {Number} creation_interval
	 */
	constructor(practical_Type, visible_list, creation_interval = 0) {
		this.practical_Type = practical_Type
		this.visible_list = visible_list
		this.practicals = new Set()
		if (creation_interval > 0) {
			this.creation_interval = setInterval(() => { this.create_practical() }, creation_interval)
		}
	}
	create_practical() {
		let practical_Type = this.practical_Type
		let practical = new practical_Type(this.visible_list, this)
		return practical
	}
}

export { Practical_Emitter }