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
		const currentVc = interaction.member.voice.channel;

		// check for current VC
		if (!currentVc) {
			return await interaction.reply({
				content: "Please rejoin your voice channel before using this command!",
				ephemeral: true
			});
		};
		
		// get searchstring
		let searchString;
		try {
			searchString = interaction.options.getString("input");
		} catch (e) {
		 	searchString = null
		};

		// attempt to retrieve video
		await interaction.deferReply();
		let youtubeLink;
		let trackTitle = searchString;
		try {
			if (searchString.includes("youtube.com/playlist")) {
				//// PLAYLIST
				// needs a seperate logic for playlists
				const playlist = searchString;

				// create queue
				let queue = player.getQueue(interaction.guildId);
				if (!queue) {
					queue = player.createQueue(interaction.guildId);
				}
				await queue.join(currentVc);

				// add track to queue
				try {
					await queue.playlist(playlist);
				} catch (e) {
					// error: 410
					console.log(e);
					return await interaction.editReply("❌ **Error**\nNo valid playlist found. One or more of the videos may be restricted.");
				}
				return await interaction.editReply(`✅ Added playlist ${trackTitle} to the queue.`);

			} else if (searchString.includes("youtube.com")) {
				//// DIRECT VIDEO
				youtubeLink = searchString;

			} else {
				//// SEARCH QUERY
				results = await ytSearch(searchString);
				if (!results?.all?.length) {
					// error: no result
					return await interaction.editReply("❌ **Error**\nNo results found. Try using a direct youtube url.");
				}
				youtubeLink = results.all[0].url;
				trackTitle = results.all[0].title;
			}
		} catch (e) {
			// error: misc
			return await interaction.editReply(`❌ **Error**\n${e.message}`);
		};

		// create queue
		let queue = player.getQueue(interaction.guildId);
        if (!queue) {
            queue = player.createQueue(interaction.guildId);
        }
		await queue.join(currentVc);

		// add track to queue
		try {
			await queue.play(youtubeLink);
		} catch (e) {
			// error: 410
			return await interaction.editReply("❌ **Error**\nNo video found. Your video might be restricted.");
		}
		await interaction.editReply(`✅ Added ${trackTitle} to the queue.`);
	},
};