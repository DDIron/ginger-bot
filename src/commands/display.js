const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("display")
		.setDescription("Display the currently playing track."),
	execute(interaction) {
        // if queue exists, get queue info
        let guildQueue = interaction.client.player.getQueue(interaction.guildId);
		if (!guildQueue) {
			return interaction.reply({
				content: "❌ There is no song currently playing.",
				ephemeral: true
			});
		}
		progressBar = guildQueue.createProgressBar().times;
        progress = progressBar.split("/")[0];
		song = guildQueue.nowPlaying;

        const printDisplay = require("../modules/printDisplay.js");
        printDisplay.execute(false, song, progress, "🍪 Currently playing:");
	}
}