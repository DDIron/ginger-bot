const { SlashCommandBuilder, CategoryChannel } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("seek")
		.setDescription("Skip forwards or backwards in the currently playing song.")
        .addStringOption(option => option
			.setName("time")
			.setDescription("Format: hh/mm/ss")
			.setRequired(true)),
	execute(interaction) {
		const input = interaction.options.getString("time");

        // get queue
        let guildQueue = interaction.client.player.getQueue(interaction.guildId);
		if (!guildQueue) {
			return interaction.reply({
				content: "❌ There is no song currently playing.",
				ephemeral: true
			});
		}

        // validate provided input
		let inputSeconds;
		try {
			const x = input.split(":");
			if ((x.length != 3) || x.includes("-")) throw "Invalid input.";
			inputSeconds = (+x[0]) * 60 * 60 + (+x[1]) * 60 + (+x[2]);
		} catch (e) {
			return interaction.reply({
				content: "❌ **Error** \nInvalid input. Use the format hh:mm:ss.",
				ephemeral: true
			});
		}

        // seek
		try {
        	guildQueue.seek(inputSeconds * 1000);
		} catch (e) {
			return interaction.reply({
				content: `❌ **Error** \n${e}`,
				ephemeral: true
			});
		}
        interaction.reply(`Skipping to ${input}...`);
	}
};