class Player_Interface {
	/**
	 * @param {String} server
	 */
	constructor(server) {
		this.server = server
		this.is_connected = false
		this.join_callBack = undefined
	}
	join(params) {
		var xhttp = new XMLHttpRequest();
		//globalThis.this__ = this
		let queryString = Object.keys(params).map(k => `${k}=${encodeURI(params[k])}`).join('&');

		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4 && xhttp.status == 201) {
				this.set_data_from_responseText(xhttp.responseText)
				this.is_connected = true
				if(this.join_callBack != undefined){
					this.join_callBack()
				}
			} else if(xhttp.readyState == 4){
				console.group("join Error")
				console.log(`status is ${xhttp.status}`)
				console.log(xhttp)
				if(this.join_callBack_bad != undefined){
					this.join_callBack_bad()
				}
				console.groupEnd("join Error")
			}
		};

		xhttp.open("POST", this.server + "?" + queryString, true);
		xhttp.send();

		window.addEventListener("beforeunload", (Event_) => {
			this.leave()
		})

	}
	/**
	 * @param {String} responseText
	 */
	set_data_from_responseText(responseText) {
		let server_json = JSON.parse(responseText)
		this.uuid = server_json.uuid
	}
	leave() {
		this.is_connected = false

		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = () => {
			if (xhttp.readyState == 4) {
				console.log(xhttp.responseText)
				//this.is_connected = true
			}
		};
		xhttp.open("DELETE", `${this.server}${this.uuid}/`, true);
		xhttp.send();
	}
	/**
	 * @param {Object} data
	 */
	change(data){
		var xhttp = new XMLHttpRequest();
		var queryString = "?" + (Object.keys(data).map(key => key + '=' + data[key]).join('&'))
		xhttp.open("POST", `${this.server}${this.uuid}/${queryString}`, true);
		xhttp.send();
	}
}

export { Player_Interface }