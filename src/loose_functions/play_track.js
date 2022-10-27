const { Player } = require("discord-music-player");

module.exports = {
	async execute(interaction, queue, youtubeLink) {
		
        // play track
		await queue.play(youtubeLink);

        // print display
        const print_display = require("./print_display.js");
		await print_display.execute(interaction, youtubeLink);
	}
};