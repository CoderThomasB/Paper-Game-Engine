
export default [
	{
		// Main
		input: "./src/Main.js",
		output: {
			format: 'umd',
			name: 'Paper',
			file: './Build/2D.js',
		},
	},
	// Multi_Player Server
	{
		input: "./src/Multi_Player/Server/Main.js",
		output: {
			format: 'umd',
			name: 'Player',
			file: './Build/Multi_Player/2D/Server.js',
		},
	},
	// Multi_Player Client
	{
		input: "./src/Multi_Player/Client/Main.js",
		output: {
			format: 'umd',
			name: 'Paper',
			file: './Build/Multi_Player/2D/Client.js',
		},
	},

	// Add-Ons
	// Multi_Player Server Chat
	{
		input: "./src/Add_Ons/Multi_Player/Chat/Server/Main.js",
		external: ['uuid'],
		output: {
			format: 'umd',
			name: 'Chat',
			file: './Build/Add_Ons/Multi_Player/Chat/Server.js',
		},
	},
	// Multi_Player Client Chat
	{
		input: "./src/Add_Ons/Multi_Player/Chat/Client/Main.js",
		output: {
			format: 'umd',
			name: 'Chat',
			file: './Build/Add_Ons/Multi_Player/Chat/Client.js',
		},
	},
	// Multi_Player Server Player_Management
	{
		input: "./src/Add_Ons/Multi_Player/Player_Management/Server/Main.js",
		external: ['uuid'],
		output: {
			format: 'umd',
			name: 'Player_Management',
			file: './Build/Add_Ons/Multi_Player/Player_Management/Server.js',
		},
	},
	// Multi_Player Client Player_Management
	{
		input: "./src/Add_Ons/Multi_Player/Player_Management/Client/Main.js",
		external: ['uuid'],
		output: {
			format: 'umd',
			name: 'Player_Management',
			file: './Build/Add_Ons/Multi_Player/Player_Management/Client.js',
		},
	},
]