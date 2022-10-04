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
				description: "Ginger v2.0.0",
				color: 0xe44424,
				fields: [{
						name: `/help`,
						value: `- Displays this message`
					},
					{
						name: `/queue`,
						value: `- Add a song or playlist to the track queue\n- Displays the track queue when left empty`
					},
					{
						name: `/play`,
						value: `- Play a song via Youtube search or url\n- Plays the track queue when left empty`
					},
					{
						name: `/remove`,
						value: `- Remove a song from the queue`
					},
					{
						name: `/lyrics`,
						value: `- Retrieve the lyrics of a specified song`
					},
					{
						name: `/display`,
						value: `- Displays the play panel`
					}
				],
				footer: {
					text: "Thank you for using Ginger! If you have any suggestions or bug reports, you can send it using /feedback :)"
				}
			}]
		});
	},
};