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
		interaction.deferReply();
		let youtubeLink;
		try {
			if (searchString.includes("youtube.com")) {
				//// DIRECT VIDEO
				youtubeLink = searchString;
			} else if (searchString.startsWith("https://www.youtube.com/playlist?list=")) {
				//// PLAYLIST
				const playlist = await ytpl(commandString.split(`https://www.youtube.com/playlist?list=`).pop())
				
				
			} else {
				//// SEARCH QUERY

				results = await ytSearch(searchString);
				if (!results?.all?.length) {
					// error: no result
					return await interaction.editReply("❌ **Error**\nNo results found. Try using a direct youtube url.");
				}
				youtubeLink = results.all[0].url;
			}
		} catch (e) {
			// error: misc
			return await interaction.editReply(`❌ **Error**\n${e.message}`);
		};

		// create player
		let queue = player.getQueue(interaction.guildId);
        if (!queue) {
            queue = player.createQueue(interaction.guildId);
        }
		await queue.join(currentVc);

		// queue track
		try {
			await queue.play(youtubeLink);
		} catch (e) {
			// error: 410
			return await interaction.editReply("❌ **Error**\nNo video found. Your video might be restricted.");
		}
		await interaction.editReply(`✅ Added ${youtubeLink} to the queue.`);
	},
};