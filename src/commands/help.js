const { SlashCommandBuilder } = require("discord.js");
const { botVersion } = require("../config.json")

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
				description: `Ginger v${botVersion}`,
				color: 0xe44424,
				fields: [{
						name: `/help`,
						value: `- Displays this message`
					},
					{
						name: `/play`,
						value: `- Queue a track or playlist via Youtube search or url`
					},
					{
						name: `/display`,
						value: `- Display the currently playing track and play panel.`
					},
					{
						name: `/seek`,
						value: `- Skip forwards or backwards in the current track`
					},
					{
						name: `/queue`,
						value: `- Display the track queue`
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