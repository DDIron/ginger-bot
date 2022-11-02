const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("display")
		.setDescription("Display the currently playing track."),
	execute(interaction) {
        // if queue exists, get queue info
        let guildQueue = interaction.client.player.getQueue(interaction.guildId);
		if (!guildQueue) {
			return interaction.reply({
				content: "❌ There is no song currently playing.",
				ephemeral: true
			});
		}
		progressBar = guildQueue.createProgressBar().times;
        timestampTimes = progressBar.split("/");
		song = guildQueue.nowPlaying;

		interaction.reply({
            content: "✅ Printing display...",
            embeds: [
                {
                    title: `🍪 Currently playing:`,
                    description: song.name,
                    color: 0xe44424,
                    fields: [
                    {
                        name: `Timestamp:`,
                        value: `${timestampTimes[0]} - ${song.duration}`
                    }
                    ],
                    thumbnail: {
                        url: song.thumbnail,
                    },
                    url: song.url
                }
            ],
            components: [
            {
                type: 1,
                components: [
                {
                    style: 1,
                    label: `Pause/Play`,
                    custom_id: `buttonPause`,
                    disabled: false,
                    emoji: {
                    id: null,
                    name: `⏸`
                    },
                    type: 2
                },
                {
                    style: 2,
                    label: `Loop`,
                    custom_id: `buttonLoop`,
                    disabled: false,
                    emoji: {
                    id: null,
                    name: `🔁`
                    },
                    type: 2
                },
                {
                    style: 2,
                    label: `Skip`,
                    custom_id: `buttonSkip`,
                    disabled: false,
                    emoji: {
                    id: null,
                    name: `⏩`
                    },
                    type: 2
                },
                {
                    style: 4,
                    label: `Stop`,
                    custom_id: `buttonStop`,
                    disabled: false,
                    emoji: {
                    id: null,
                    name: `🛑`
                    },
                    type: 2
                }
                ]
            }
            ],
        });
	}
};