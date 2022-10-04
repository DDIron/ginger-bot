const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("remove")
		.setDescription("Remove a song from the queue.")
		.addIntegerOption(option => option
			.setName("id")
			.setDescription("The index of the song to remove.")
			.setRequired(true)),
	async execute(interaction) {
		const input = interaction.options.getInteger("id");
		const fileData = fs.readFileSync("./src/gingerDatabase.json");
		const musicQueues = JSON.parse(fileData);

		let currentQueue = musicQueues[interaction.guildId] || [];

		if (currentQueue.length) {
			// remove track from queue
			if (1 <= input && input <= currentQueue.length) {
				let removed_track = currentQueue[input - 1]
				currentQueue.splice(input - 1, 1)
				musicQueues[interaction.guildId] = currentQueue;
				fs.writeFile("./src/gingerDatabase.json", JSON.stringify(musicQueues, null, 2), function finished(e) {
					// error: misc
					if (e) interaction.reply({
						content: `❌ **Error**\n${e.message}`,
						ephemeral: true
					})
					return;
				});
				interaction.reply(`✅ Removed ${removed_track} from the queue.`);	
			} else {
				// error: invalid input
				interaction.reply({
					content: `❌ **Error** \nPlease enter a number from 1-${currentQueue.length}`,
					ephemeral: true
				});
			}
		} else {
			// error: empty queue
			interaction.reply({
				content: "❌ The queue is empty!",
				ephemeral: true
			});
		}
	},
};