const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription("Retrieve a list of available commands."),
	execute(interaction) {
		interaction.reply({
			content: "",
			embeds: [{
				type: "rich",
				title: `🍪 Command Guide`,
				description: "Ginger v3.0.2",
				color: 0xe44424,
				fields: [{
						name: `/help`,
						value: `- Displays this message`
					},
					{
						name: `/queue`,
						value: `- Display the track queue`
					},
					{
						name: `/play`,
						value: `- Queue a track or playlist via Youtube search or url`
					},
					{
						name: `/remove`,
						value: `- Remove a song from the queue`
					},
					{
						name: `/lyrics`,
						value: `- Retrieve the lyrics of a specified song`
					},
				],
				footer: {
					text: "Thank you for using Ginger! If you have any suggestions or bug reports, you can send it using /feedback :)"
				}
			}]
		});
	},
};