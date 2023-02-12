const { SlashCommandBuilder } = require("discord.js");
const solenolyrics = require("solenolyrics");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("lyrics")
		.setDescription("Retrieve lyrics on a song.")
		.addStringOption(option => option
			.setName("song")
			.setDescription("The song to retrieve lyrics for.")
			.setRequired(true)),
	async execute(interaction) {
		await interaction.deferReply();

		const input = await interaction.options.getString("song")
		
		const title = await solenolyrics.requestTitleFor(input) || false;
		const song_lyrics = await solenolyrics.requestLyricsFor(title)
		const song_writer = await solenolyrics.requestAuthorFor(title)

		if (!title) {
			// error: lyrics unavailable
			return interaction.editReply("❌ **Error** \nThis song does not have any available lyrics.");
		}

		// reply with lyrics
		return interaction.editReply({
			content: "",
			embeds: [{
				type: "rich",
				title: `🍪 ${song_writer} || ${title}`,
				description: `${song_lyrics}`,
				color: 0xe44424,
			}]
		});
	},
};