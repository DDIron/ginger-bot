const { SlashCommandBuilder } = require("discord.js");
const lyricsFinder = require("lyrics-finder");
// find a better node module for this

module.exports = {
	data: new SlashCommandBuilder()
		.setName("lyrics")
		.setDescription("Retrieve lyrics on a song.")
		.addStringOption(option => option
			.setName("artist")
			.setDescription("The artist of the song.")
			.setRequired(true))
		.addStringOption(option => option
			.setName("song")
			.setDescription("The song to retrieve lyrics for.")
			.setRequired(true)),
	execute(interaction) {
		interaction.deferReply();

		const artist = interaction.options.getString("artist");
		const title = interaction.options.getString("song");
		const song_lyrics = lyricsFinder(artist, title);

		if (song_lyrics) {
			// reply with lyrics
			interaction.editReply({
				content: "",
				embeds: [{
					type: "rich",
					title: `🍪 ${title} Lyrics:`,
					description: `${song_lyrics}`,
					color: 0xe44424,
				}]
			});
		} else {
			// error: lyrics unavailable
			return interaction.editReply("❌ **Error** \nThis song does not have any available lyrics.");
		}
	},
};