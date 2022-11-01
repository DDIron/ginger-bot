const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("queue")
		.setDescription("Displays the queue."),
	async execute(interaction) {
		
		// get queue
		let guildQueue = interaction.client.player.getQueue(interaction.guildId);
		if (!guildQueue) {
			return await interaction.reply({
				content: "❌ There is no ongoing queue.",
				ephemeral: true
			});
		}

		await interaction.deferReply();

		// list queue
		if (guildQueue.songs.length > 10) {
			interaction.editReply({
				content: "",
				embeds: [{
					title: `🍪 Current playlist:`,
					description: `- ${guildQueue.songs.slice(1, 10).join(`\n- `)}`,
					color: 0xe44424,
					footer: {
						text: `+${guildQueue.length - 10} more rows...`
					}
				}]
			});
		} else {
			interaction.editReply({
				content: "",
				embeds: [{
					title: `🍪 Current playlist:`,
					description: `- ${guildQueue.songs.join(`\n- `)}`,
					color: 0xe44424,
				}]
			});
		}
	},
};