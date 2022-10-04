const { SlashCommandBuilder } = require("discord.js");
const {
	joinVoiceChannel,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");
const ytSearch = require("yt-search");
const fs = require("fs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Play a YouTube video or start the queue.")
		.addStringOption(option => option
			.setName("input")
			.setDescription("Provide a search query or youtube url. Plays the queue if left empty.")),
	async execute(interaction) {
		const currentVc =  interaction.member.voice.channel;

		let musicQueues = JSON.parse(fs.readFileSync("./src/gingerDatabase.json"));
		let currentQueue = musicQueues[interaction.guildId] || [];
		let searchString;
		try { // could be neater
			searchString = interaction.options.getString("input");
		} catch (e) {
			searchString = null
		}

		if (currentVc) {
			// attempt to retrieve video
			let youtubeLink;

			try {
				if (searchString) {
					if (!searchString.includes("youtube.com")) {
						results = await ytSearch(searchString);
						if (!results?.all?.length) {
							// error: no result
							interaction.editReply("❌ **Error**\nNo results found. Try using a direct youtube url.");
							return;
						}
						youtubeLink = results.all[0].url;
					} else {
						youtubeLink = searchString;
					}
				} else if (currentQueue.length){
					youtubeLink = currentQueue[0];
					currentQueue.splice(0, 1);
					musicQueues[interaction.guildId] = currentQueue;

					fs.writeFile("./src/gingerDatabase.json", JSON.stringify(musicQueues, null, 2), function finished(e) {
						// error: misc
						if (e) interaction.editReply(`❌ **Error**\n${e.message}`)
						return;
					});
				} else {
					// error: empty queue
					interaction.editReply("❌ **Error**\nThe queue is empty!");
					return;
				}
			} catch (e) {
				// error: misc
				interaction.editReply(`❌ **Error** ${e}`)
				return;
			};
			let audioDownload;
			audioDownload = ytdl(youtubeLink, { filter: "audioonly" });
			
			// join vc
			const voiceConnection = joinVoiceChannel({
				channelId: currentVc.id,
				guildId: interaction.guildId,
				adapterCreator: interaction.guild.voiceAdapterCreator
			});

			// play track
			const play_track = require("../loose_functions/play_track");
			await play_track.execute(audioDownload, youtubeLink, voiceConnection, interaction);

		} else {
			// error: not in channel
			interaction.editReply({
				content: "Please rejoin your voice channel before using this command!",
				ephemeral: true
			});
			return;
		};
	},
};