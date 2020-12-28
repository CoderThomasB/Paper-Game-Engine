class ActionLink {
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

export { ActionLink }