const { SlashCommandBuilder } = require("discord.js");

const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const fs = require("fs");
const { Player } = require("discord-music-player")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Add a youtube video or playlist to the queue.")
		.addStringOption(option => option
			.setName("input")
			.setDescription("Provide a search query or youtube url.")
			.setRequired(true)),
	async execute(interaction) {

		const bot = interaction.client
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

		// queue track
		const play_track = require("../loose_functions/play_track.js");
		const player = new Player(bot, {
			leaveOnEmpty: false,
		});
		bot.player = player;

		let queue = bot.player.createQueue(interaction.guildId);
		await queue.join(currentVc);

		try {
			await play_track.execute(interaction, queue, youtubeLink);
		} catch (e) {
			// error: 410
			return await interaction.editReply({
				content: "❌ **Error**\nNo video found. Your video might be restricted.",
				ephemeral: true
			});
		}
		await interaction.editReply("✅ Playing track...")
	},
};