class Sound_Component {
	/**
	 * @param {String} sound_src the src of the sound
	 * @param {Boolean} loop determines if the sound will loop
	 */
	constructor(sound_src, loop = false) {

		console.warn("The Sound_Component is going to be rewritten. DO NOT USE... now")

		this.HTML_sound = document.createElement("audio");
		this.HTML_sound.src = sound_src;
		this.HTML_sound.loop = loop;
		this.HTML_sound.setAttribute("preload", "auto");
		this.HTML_sound.setAttribute("controls", "none");
		this.HTML_sound.style.display = "none";
		document.head.appendChild(this.HTML_sound);
	}
}

export { Sound_Component }