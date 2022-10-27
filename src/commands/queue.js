const { SlashCommandBuilder } = require("discord.js");
const ytSearch = require("yt-search");
const ytpl = require("ytpl");
const fs = require("fs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("queue")
		.setDescription("Displays the queue."),
	async execute(interaction) {
		await interaction.deferReply();

		let guildQueue
		try {
			guildQueue = interaction.client.player.getQueue(interaction.guildId);
		} catch (e) {
			return await interaction.editReply("❌ I'm not currently active.");
		}

		if (guildQueue.songs.length > 10) {
			interaction.editReply({
				content: "",
				embeds: [{
					title: `🍪 Current playlist:`,
					description: `- ${guildQueue.songs.slice(1, 10).join(`\n- `)}`,
					color: 0xe44424,
					footer: {
						text: `+${currentQueue.length - 10} more rows...`
					}
				}]
			});
		} else {
			interaction.editReply({
				content: "",
				embeds: [{
					title: `🍪 Current playlist:`,
					description: `- ${guildQueue.songs.join(`\n- `)}`,
					color: 0xe44424,
				}]
			});
		}

		// } else if (commandString.startsWith(`https://www.youtube.com/playlist?list=`)) {
		// 	// QUEUE PLAYLIST
		// 	try {
		// 		const playlist = await ytpl(commandString.split(`https://www.youtube.com/playlist?list=`).pop())
				
		// 		for (let i = 0; i < playlist.items.length; i++) {
		// 			currentQueue.push(`${playlist.items[i].url}`)
		// 		}
		// 		musicQueues[interaction.guildId] = currentQueue;
		// 		fs.writeFile("./src/gingerDatabase.json", JSON.stringify(musicQueues, null, 2), function finished(e) {
		// 			// error: misc
		// 			if (e) interaction.editReply(`❌ **Error**\n${e.message}`)
		// 		});

		// 		interaction.editReply(`**✅ Added playlist: '${playlist.title}' to the queue**`);
		// 	} catch (e) {
		// 		// error: unavailable playlist
		// 		interaction.editReply("**❌ Error**\nThis playlist does not exist!");
		// 	}

		// } else {
		// 	// QUEUE VIDEO
		// 	try {
		// 		let youtubeLink;
		// 		if (!commandString.includes("youtube.com")) {
		// 			let results = await ytSearch(commandString);
		// 			if (!results ?.all ?.length) {
		// 				interaction.editReply("**❌ No results found. Try using a youtube url.**");
		// 				return;
		// 			}

		// 			youtubeLink = results.all[0].url;
		// 		} else {
		// 			youtubeLink = commandString;
		// 		}
		// 		currentQueue.push(`${youtubeLink}`);
		// 		musicQueues[interaction.guildId] = currentQueue;
		// 		fs.writeFile("./src/gingerDatabase.json", JSON.stringify(musicQueues, null, 2), function finished(e) {
		// 			// error: misc
		// 			if (e) interaction.editReply(`❌ **Error**\n${e.message}`);
		// 			return;
		// 		});

		// 		interaction.editReply(`✅ **Added '${commandString}' to the queue.**`);

		// 	} catch (e) {
		// 		// error: misc (e.g. restricted video)
		// 		interaction.editReply(`❌ **Error**\n${e.message}`);
		// 	}
		// }
	},
};