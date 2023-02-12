const { SlashCommandBuilder } = require("discord.js");
const ytSearch = require("yt-search");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Add a youtube video or playlist to the queue.")
		.addStringOption(option => option
			.setName("input")
			.setDescription("Provide a search query or youtube url.")
			.setRequired(true)),
	async execute(interaction) {

		const player = interaction.client.player;
		const currentVc = interaction.member.voice.channel || false;

		// check for current VC
		if (!currentVc) {
			return interaction.reply({
				content: "Please rejoin your voice channel before using this command!",
				ephemeral: true
			});
		}
		
		// get searchstring
		const searchString = interaction.options.getString("input") || false;
		if (!searchString) {
			return interaction.reply({
				content: "❌ **Error**\nFalsy input was provided.",
				ephemeral: true
			});
		}
		let trackTitle = searchString;

		// attempt to retrieve video
		await interaction.deferReply();

		if (searchString.includes("youtube.com/playlist")) {
			////////////
			// PLAYLIST
			////////////

			// create queue
			let queue = player.getQueue(interaction.guildId);
			if (!queue) { queue = player.createQueue(interaction.guildId) };
			queue.join(currentVc);

			// add track to queue
			try {
				await queue.playlist(searchString);
			} catch (e) {
				// error: 410
				console.log(e);
				return interaction.editReply("❌ **Error**\nNo valid playlist found. One or more of the videos may be restricted.");
			}
			return interaction.editReply(`✅ Added playlist to the queue.`);
		}
		
		// Single Video
		let youtubeLink;
		if (searchString.includes("youtube.com")) {
			////////////
			//// DIRECT VIDEO
			////////////
			youtubeLink = searchString;
		} else {
			////////////
			//// SEARCH QUERY
			///////////
			results = await ytSearch(searchString);
			if (!results?.all?.length) {
				// error: no result
				return interaction.editReply("❌ **Error**\nNo results found. Try using a direct youtube url.");
			}
			youtubeLink = results.all[0].url;
			trackTitle = results.all[0].title;
		}

		// create queue
		let queue = player.getQueue(interaction.guildId);
        if (!queue) {
            queue = player.createQueue(interaction.guildId);
        }
		await queue.join(currentVc);

		// add track to queue
		try {
			queue.play(youtubeLink);
		} catch (e) {
			// error: 410
			return interaction.editReply("❌ **Error**\nNo video found. Your video might be restricted.");
		}
		interaction.editReply(`✅ Added ${trackTitle} to the queue.`);
	}
}