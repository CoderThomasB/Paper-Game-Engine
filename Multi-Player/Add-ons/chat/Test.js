require("../chat/Server")

the_chat = new base_chat_API(undefined, undefined, -1)

the_chat.push("Hello Thomas")
the_chat.push("Hello Mathew")

console.log(the_chat.data_to_send())

//////////////////////////////////

the_chat = new sender_chat_API_fullString(undefined, undefined, -1)

the_chat.push({sender:"Matthew",body:"Hello Thomas"})
the_chat.push({sender:"Thomas",body:"Hello Matthew"})

console.log(the_chat.data_to_send())

//////////////////////////////////

the_chat = new base_chat_API(undefined, undefined, 10)

for(let x = 0; x <= 40; x++){
	the_chat.push(x.toString())
}

console.log(the_chat.data_to_send())
