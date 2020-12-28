class Polygon {
	/**
	 * @param {Array<Vector2>} points
	 * @param {boolean} fill
	 */
	constructor(points, fill = false) {
		this.points = points
		this.fill = fill
	}
}

export { Polygon }