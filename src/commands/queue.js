const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("queue")
		.setDescription("Displays the queue."),
	async execute(interaction) {
		
		// get queue
		let guildQueue = await interaction.client.player.getQueue(interaction.guildId);
		if (!guildQueue) {
			return interaction.reply({
				content: "❌ There is no ongoing queue.",
				ephemeral: true
			});
		}

		await interaction.deferReply();

		// list queue
		let footer_text
		if (guildQueue.songs.length > 10) {
			footer_text = { text: `+${guildQueue.length - 10} more tracks...`}
		}
		interaction.editReply({
			content: "",
			embeds: [{
				title: `🍪 Current queue:`,
				description: `- ${guildQueue.songs.slice(1, 10).join(`\n- `)}`,
				color: 0xe44424,
				footer: footer_text
			}]
		});
	},
};