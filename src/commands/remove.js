const { SlashCommandBuilder } = require("discord.js");

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
		try {
            guildQueue = interaction.client.player.getQueue(interaction.guildId);
        } catch (e) {
			// error: no queue
			return await interaction.reply({
				content: `❌ **Error**\nThere is no queue in this server.`,
				ephemeral: true
			})
        }

		interaction.reply(`✅ Removing ${guildQueue.songs[input - 1]} from the queue.`);
		try {
			guildQueue.remove(input - 1)
		} catch {
			// error: invalid input
			return await interaction.editReply({
				content: `❌ **Error** \nPlease enter a number from 1-${guildQueue.length}`,
				ephemeral: true
			});
		}
	},
};