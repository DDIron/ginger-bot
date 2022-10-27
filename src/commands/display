const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("display")
		.setDescription("Displays the play panel."),
	async execute(interaction) {
		await interaction.deferReply();

		const print_display = require("../loose_functions/print_display");
		await print_display.execute(interaction);
	},
};