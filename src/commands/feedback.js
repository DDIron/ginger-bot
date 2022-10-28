const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("feedback")
		.setDescription("Send bug reports or feedback!")
		.addStringOption(option => option
			.setName("message")
			.setDescription("The message you wish to send")
			.setRequired(true)),
	execute(interaction) {
		const message = interaction.options.getString("message");
		const turkey = interaction.client.users.send(
			"741228198850854949",
		{
			content: "",
			embeds: [
				{
				type: "rich",
				title: `🍪 Feedback from ${interaction.user.username}:`,
				description: "",
				color: 0xe44424,
				fields: [
					{
					name: `Ginger v3.0.2`,
					value: `${message}`
					},
				],
				footer: {
					text: `user id: ${interaction.user.id}`
				}
				}
			]
		});

		interaction.reply({
			content: "Feedback has been sent!",
			ephemeral: true
		})
	},
};